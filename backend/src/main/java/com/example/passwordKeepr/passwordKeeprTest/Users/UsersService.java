package com.example.passwordKeepr.passwordKeeprTest.Users;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

/* data access layer
 * the service layer is mostly responsible for business logic, we are using the N-Tier design pattern here
 * https://stackoverflow.com/questions/44650075/localdatetime-in-seconds */
@Service
public class UsersService {

    private static final String PASSWORD_REGEX = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#&()–[{}]:;',?/*~$^+=<>]).{8,20}$";
    private boolean duplicateFound = false;
    private final UsersRepository usersRepository;
    private PasswordEncoder passwordEncoder;

    @Autowired
    public UsersService(UsersRepository usersRepository) {
        this.usersRepository = usersRepository;
    }

    public List<User> getUsers() {
        List<User> usersFromDb = usersRepository.findAll();
        return usersFromDb;
    }

    public String updateUsersPassword(Map<String, Object> lookupRequestObject) {
        String newPassword = (String) lookupRequestObject.get("newPassword");
        String newPasswordConfirm = (String) lookupRequestObject.get("newPasswordConfirm");
        String verificationCode = (String) lookupRequestObject.get("verificationCode");
        User userToUpdatePassword = usersRepository.findByVerificationCode(verificationCode);

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
            if (newPassword.equals(blacklistedValues.get(i)) == true) {
                this.duplicateFound = true;
                break;
            }
        }

        if (userToUpdatePassword == null) {
            throw new IllegalStateException("Oops, doesn't look like a valid account exists for this request!");
        } else if (newPassword.equals(newPasswordConfirm) == false) {
            throw new IllegalStateException("Password and password confirmation do not match!");
        } else if (duplicateFound == true) {
            throw new IllegalStateException("You can't use that password!");
        }

        this.passwordEncoder = new BCryptPasswordEncoder();
        String encodedPassword = this.passwordEncoder.encode(newPassword);
        userToUpdatePassword.setMasterPassword(encodedPassword);
        usersRepository.save(userToUpdatePassword);
        return "Your password was successfully updated! Please use it to login";
    }

    public boolean verifyResetFormValid(Map<String, Object> lookupRequestObject) {
        String verificationCode = (String) lookupRequestObject.get("verificationCode");
        User userFromDbToVerify = usersRepository.findByVerificationCode(verificationCode);
        long currentDateTimeSecondDuration = getMinuteDuration(LocalDateTime.now());
        long emailCreationTimestampSecondDuration = getMinuteDuration(userFromDbToVerify.getTimestamp_pw_reset());
        long minutesDifference =  currentDateTimeSecondDuration - emailCreationTimestampSecondDuration;

        if (minutesDifference > 20) {
            return false;
        } else {
            return true;
        }
    }

    private long getMinuteDuration(LocalDateTime t) {
        long hour = t.getHour();
        long minute = t.getMinute();
        long second = t.getSecond();
        return  ((hour * 3600) + (minute * 60) + second) / 60;
    }
}
