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
        long accountFirstFailedAttemptTimestamp = 0;
        long accountLockedTimestamp = 0;

        if (userFromDb == null) {
            throw new IllegalStateException("We couldn't find an account with that email!");
        }

        boolean matches = passwordEncoder.matches(emailPassword, userFromDb.getMasterPassword());

        if (userFromDb.getFirst_failed_attempt_time() != null) {
            accountFirstFailedAttemptTimestamp = getMinuteDuration(userFromDb.getFirst_failed_attempt_time());
        }

        if (userFromDb.getLock_time() != null) {
            accountLockedTimestamp = getMinuteDuration(userFromDb.getLock_time());
        }

        long currentDateTimeSecondDuration = getMinuteDuration(LocalDateTime.now());
        LocalDateTime currentDateTime = LocalDateTime.now();
        long minutesDifferenceFirstFailedAttempt = currentDateTimeSecondDuration - accountFirstFailedAttemptTimestamp;
        long minutesDifferenceSinceAccountLock = currentDateTimeSecondDuration - accountLockedTimestamp;

        if (matches == true) {
            userFromDb.setFailed_attempt(0);
            String uuid = userFromDb.getUuid();
            String enabled = String.valueOf(userFromDb.getEnabled());
            HashMap<String, String> map = new HashMap<>();
            map.put("uuid", uuid);
            map.put("enabled", enabled);
            usersRepository.save(userFromDb);
            return map;
        } else {

            if (accountLockedTimestamp != 0) {
                verifyAccountIsStillLocked(userFromDb, minutesDifferenceSinceAccountLock, currentDateTime);
            }
            verifyLoginAttempts(userFromDb, currentDateTime, minutesDifferenceFirstFailedAttempt);
        }

        return null;
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

    private long getMinuteDuration(LocalDateTime t) {
        long hour = t.getHour();
        long minute = t.getMinute();
        long second = t.getSecond();
        return  ((hour * 3600) + (minute * 60) + second) / 60;
    }

    private void verifyAccountIsStillLocked(User userFromDb, long minutesDifferenceSinceAccountLock, LocalDateTime currentDateTime) {

        if (userFromDb.getAccount_locked() == true && minutesDifferenceSinceAccountLock < 60) {
            throw new IllegalStateException("Sorry your account is locked for 1 hour!");
        } else if (userFromDb.getAccount_locked() == true && minutesDifferenceSinceAccountLock > 60) {
            userFromDb.setAccount_locked(false);
            userFromDb.setFailed_attempt(1);
            userFromDb.setFirst_failed_attempt_time(currentDateTime);
            usersRepository.save(userFromDb);
            throw new IllegalStateException("Sorry that password is incorrect!");
        } else {
            return;
        }
    }

    private void verifyLoginAttempts(User userFromDb, LocalDateTime currentDateTime, long minutesDifferenceFirstFailedAttempt) {

        if (userFromDb.getFailed_attempt() == 0) {
            int updatedFailedAttempt = userFromDb.getFailed_attempt() + 1;
            userFromDb.setFirst_failed_attempt_time(currentDateTime);
            userFromDb.setFailed_attempt(updatedFailedAttempt);
        } else if (userFromDb.getFailed_attempt() < 3 && minutesDifferenceFirstFailedAttempt < 20) {
            int updatedFailedAttempt = userFromDb.getFailed_attempt() + 1;
            userFromDb.setFailed_attempt(updatedFailedAttempt);
        } else if (userFromDb.getFailed_attempt() < 3 && minutesDifferenceFirstFailedAttempt > 20) {
            userFromDb.setFirst_failed_attempt_time(currentDateTime);
            userFromDb.setFailed_attempt(1);
        } else if (userFromDb.getFailed_attempt() >= 3) {
            userFromDb.setAccount_locked(true);
            userFromDb.setLock_time(currentDateTime);
            userFromDb.setFailed_attempt(0);
        }

        usersRepository.save(userFromDb);
        throw new IllegalStateException("Sorry that password is incorrect!");
    }
}
