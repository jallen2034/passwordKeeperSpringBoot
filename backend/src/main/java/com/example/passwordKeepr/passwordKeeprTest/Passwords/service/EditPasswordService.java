package com.example.passwordKeepr.passwordKeeprTest.Passwords.service;
import com.example.passwordKeepr.passwordKeeprTest.Passwords.AES;
import com.example.passwordKeepr.passwordKeeprTest.Passwords.Pwned;
import com.example.passwordKeepr.passwordKeeprTest.Passwords.entity.Password;
import com.example.passwordKeepr.passwordKeeprTest.Passwords.repository.PasswordsRepository;
import com.example.passwordKeepr.passwordKeeprTest.Users.entity.User;
import com.example.passwordKeepr.passwordKeeprTest.Users.repository.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import static Constants.Constants.*;
import java.util.List;
import java.util.Map;

@Service
public class EditPasswordService {

    // Injecting UsersRepository and PasswordsRepository to access the data access layer for our user + pw data
    private final PasswordsRepository passwordsRepository;
    private final UsersRepository usersRepository;

    @Autowired
    EditPasswordService(PasswordsRepository passwordsRepository, UsersRepository usersRepository) {
        this.passwordsRepository = passwordsRepository;
        this.usersRepository = usersRepository;
    }

    private String encrypt(String text, String key) throws Exception {
        try {
            AES AESEncryptor = new AES(key);
            return AESEncryptor.encrypt(text);
        } catch (Exception ex) {
            System.out.println(AES_ERROR_EXCEPTION + ex.getMessage());
            return AES_ERROR_EXCEPTION + ex.getMessage();
        }
    }

    public String editPasswordForUser(Map<String, Object> lookupRequestObject) {
        try {
            String uuid = (String) lookupRequestObject.get(SESSION_UUID);
            String newPassword = (String) lookupRequestObject.get(NEW_PASSWORD);
            int id = (int) lookupRequestObject.get(ID);
            User userFromDb = usersRepository.findByUuid(uuid);

            if (userFromDb == null) {
                return EDIT_PASSWORD_ERROR_EXISTENCE;
            }

            List<Password> passwordList = userFromDb.getPasswordList();
            boolean pwned = Pwned.main(newPassword);

            for (Password passwordInLoop : passwordList) {
                if (passwordInLoop.getId() == id) {
                    String encryptedPassword = encrypt(newPassword, userFromDb.getMasterPassword());
                    passwordInLoop.setPassword_text(encryptedPassword);
                    passwordInLoop.setPwned(pwned);
                    usersRepository.save(userFromDb);
                    return newPassword;
                }
            }

            return EDIT_PASSWORD_ERROR_GENERIC;
        } catch (Exception ex) {
            System.out.println(EDIT_PASSWORD_ERROR_EXCEPTION + ex.getMessage()); // Log exception
            return EDIT_PASSWORD_ERROR_EXCEPTION + ex.getMessage();
        }
    }
}
