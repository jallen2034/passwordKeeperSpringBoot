package com.example.passwordKeepr.passwordKeeprTest.Users;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.io.UnsupportedEncodingException;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@Service
public class LoginService {

    @Autowired
    private JavaMailSender mailSender;
    private final UsersRepository usersRepository;
    private PasswordEncoder passwordEncoder;

    @Autowired
    public LoginService(UsersRepository usersRepository)  {
        this.usersRepository = usersRepository;
    }

    public <lookupRequestObject> HashMap<String, String> loginUser(Map<String, Object> lookupRequestObject) {
        String email = (String) lookupRequestObject.get("email");
        String password = (String) lookupRequestObject.get("password");

        if (email == "") {
            throw new IllegalStateException("Must provide email!");
        } else if (password == "") {
            throw new IllegalStateException("Must provide password!");
        }

        return this.loginUser(email, password);
    }

    // https://stackoverflow.com/questions/32129123/how-to-convert-boolean-true-or-false-to-string-value-in-groovy
    private HashMap<String, String> loginUser(String email, String password) {
        this.passwordEncoder = new BCryptPasswordEncoder();
        User userFromDb = usersRepository.findByEmail(email);
        String emailPassword = email + password;

        if (userFromDb == null) {
            throw new IllegalStateException("We couldn't find an account with that email!");
        }

        boolean matches = passwordEncoder.matches(emailPassword, userFromDb.getMasterPassword());

        if (matches == true) {
            String uuid = userFromDb.getUuid();
            String enabled = String.valueOf(userFromDb.getEnabled());
            HashMap<String, String> map = new HashMap<>();
            map.put("uuid", uuid);
            map.put("enabled", enabled);
            return map;
        } else {
            throw new IllegalStateException("Sorry that password is incorrect!");
        }
    }

    public String verify(String verificationCode) {
        User userToVerify = usersRepository.findByVerificationCode(verificationCode);

        if (userToVerify == null) {
            return "Oops, doesn't look like a valid account exists for this request!";
        } else if (userToVerify.getEnabled()) {
            return "This user has already been verified! Go log in!";
        } else {
            usersRepository.enableUser(userToVerify.getId());
            return "Account successfully verified! Go log in!";
        }
    }

    public void resetPasswordEmail(Map<String, Object> lookupRequestObject) throws UnsupportedEncodingException, MessagingException {
        String email = (String) lookupRequestObject.get("passwordResetEmail");
        User userFromDb = usersRepository.findByEmail(email);

        if (userFromDb == null) {
            throw new IllegalStateException("Uh oh! Doesn't look like that's a valid email address! Did you make a typo?");
        }

        LocalDateTime currentDateTime = LocalDateTime.now();
        userFromDb.setTimestamp_pw_reset(currentDateTime);
        usersRepository.save(userFromDb);

        String siteUrl = "http:/localhost:3000";
        String verifyUrl = siteUrl + "/resetPasswordForm" + userFromDb.getVerificationCode();
        String subject = "Please click on the following link to reset your password";
        String senderName = "PasswordKeepr Team";
        String mailContent = "<p>Dear " + userFromDb.getEmail() + ", </p>";
        mailContent += "<p>Please click the link below to reset your master password and access passWordKeepr's features!</p>";
        mailContent += "<h3><a =\"href=" + verifyUrl + "\">VERIFY</a></h3>";
        mailContent += "<p>Thank you, The PasswordKeepr team</p>";

        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);

        helper.setFrom("jallen209972@gmail.com", senderName);
        helper.setTo(userFromDb.getEmail());
        helper.setSubject(subject);
        helper.setText(mailContent, true);

        mailSender.send(message);
    }
}
