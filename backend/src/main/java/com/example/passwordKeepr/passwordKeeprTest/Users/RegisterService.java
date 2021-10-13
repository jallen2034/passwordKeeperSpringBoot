package com.example.passwordKeepr.passwordKeeprTest.Users;
import com.example.passwordKeepr.passwordKeeprTest.Exception.ApiRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.regex.Pattern;

/* https://stackoverflow.com/questions/32801008/how-to-find-out-if-an-email-already-exist-with-jpa-spring-and-sending-some-error
 * https://mkyong.com/regular-expressions/how-to-validate-password-with-regular-expression/
 * contains regex to validate a 8-20 character password with at least one digit, one
 * lowercase letter, one uppercase letter, one special character with no white spaces */
@Service
public class RegisterService {

    private static final String PASSWORD_REGEX = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#&()–[{}]:;',?/*~$^+=<>]).{8,20}$";
    private final UsersRepository usersRepository;
    private static final Pattern PASSWORD_PATTERN = Pattern.compile(PASSWORD_REGEX);
    private boolean duplicateFound = false;
    private PasswordEncoder passwordEncoder;

    @Autowired
    public RegisterService(UsersRepository usersRepository) {
        this.usersRepository = usersRepository;
    }

    public <lookupRequestObject> UUID registerUser(Map<String, Object> lookupRequestObject) {

        String email = (String) lookupRequestObject.get("email");
        String password = (String) lookupRequestObject.get("password");
        String confirmPassword = (String) lookupRequestObject.get("confirmPassword");

        List<String> blacklistedValues = Arrays.asList(
            "Passw0rd",
            "Password123",
            "password",
            "Password!",
            "123456",
            "1234567",
            "12345678",
            "123456789",
            "12345678910",
            "qwerty"
        );

        // blacklist users inputted password
        for (int i = 0; i < blacklistedValues.size(); i++) {
            if (password.equals(blacklistedValues.get(i)) == true) {
                this.duplicateFound = true;
                break;
            }
        }

        if (email == null) {
            throw new ApiRequestException("Must provide email!");
        } else if (password == null) {
            throw new ApiRequestException("Must provide password!");
        } else if (confirmPassword == null) {
            throw new ApiRequestException("Must provide password confirmation!");
        } else if (password.equals(confirmPassword) == false) {
            throw new ApiRequestException("Password and password confirmation do not match!");
        } else if (duplicateFound == true) {
            throw new ApiRequestException("You can't use that password!");
        }

        Users usersFromDb = usersRepository.findByEmail(email);

        if (usersFromDb != null) {
            throw new ApiRequestException("User already registered!");
        } else {
            return this.passwordVerifier(password, email);
        }
    }

    // https://www.techiedelight.com/validate-password-java/
    private UUID passwordVerifier(String password, String email) {
        System.out.println(password);

        if (PASSWORD_PATTERN.matcher(password).matches()) {
            return this.commitNewUser(email, password);
        } else {
            throw new ApiRequestException("Password does not meet complexity requirement!");
        }
    }

    private UUID commitNewUser(String email, String password)  {
        UUID uuid = UUID.randomUUID();
        this.passwordEncoder = new BCryptPasswordEncoder();
        String encodedPassword = this.passwordEncoder.encode(password);
        Users newUser = new Users(0, email, encodedPassword, uuid);
        usersRepository.save(newUser);
        return uuid;
    }
}
