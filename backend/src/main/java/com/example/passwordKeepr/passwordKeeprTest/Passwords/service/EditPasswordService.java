package com.example.passwordKeepr.passwordKeeprTest.Passwords.service;
import com.example.passwordKeepr.passwordKeeprTest.Passwords.AES;
import com.example.passwordKeepr.passwordKeeprTest.Passwords.Pwned;
import com.example.passwordKeepr.passwordKeeprTest.Passwords.entity.Password;
import com.example.passwordKeepr.passwordKeeprTest.Passwords.repository.PasswordsRepository;
import com.example.passwordKeepr.passwordKeeprTest.Users.entity.User;
import com.example.passwordKeepr.passwordKeeprTest.Users.repository.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import static ErrorMessageConstants.ErrorMessageConstants.*;
import java.util.List;
import java.util.Map;


@Service
public class EditPasswordService {

    // Dependency injection for the PasswordsRepository and UsersRepository data access layer/entity objects.
    private final PasswordsRepository passwordsRepository;
    private final UsersRepository usersRepository;

    @Autowired
    EditPasswordService(PasswordsRepository passwordsRepository, UsersRepository usersRepository) {
        this.passwordsRepository = passwordsRepository;
        this.usersRepository = usersRepository;
    }

    public <lookupRequestObject> String editPasswordForUser(Map<String, Object> lookupRequestObject) throws Exception {
        try {
            String sessionUuid  = (String) lookupRequestObject.get("sessionUuid");
            String newPassword = (String) lookupRequestObject.get("newPassword");
            int passwordIdToEdit = (int) lookupRequestObject.get("id");

            // It's a good practice to check if 'sessionUuid ' is null before using it.
            if (sessionUuid == null) {
                throw new IllegalArgumentException(SESSION_UUID_NULL);
            }

            // Get user from DB by ID
            User userFromDb = usersRepository.findByUuid(sessionUuid );

            // Check if the user exists before proceeding.
            if (userFromDb == null) {
                throw new IllegalStateException(USER_NOT_FOUND);
            }

            // Get the user's master password and password list.
            String userMasterPassword = userFromDb.getMasterPassword();
            List passwordList = userFromDb.getPasswordList();
            boolean isPwned = Pwned.main(newPassword);

            // Loop through the password list and find the password to edit.
            for (int i = 0; i < passwordList.size(); i++) {
                Password singlePassword = (Password) passwordList.get(i);
                int passwordId = singlePassword.getId();

                if (passwordId == passwordIdToEdit) {
                    String encryptedPassword = encrypt(newPassword, userMasterPassword );
                    singlePassword.setPassword_text(encryptedPassword);
                    singlePassword.setPwned(isPwned );
                    usersRepository.save(userFromDb);
                    return newPassword;
                }
            }

            return PASSWORD_EDIT_FAILED;
        } catch (Exception ex) {
            System.out.println(PASSWORD_EDIT_ERROR + ex);
            throw new IllegalStateException(PASSWORD_EDIT_ERROR, ex);
        }
    }

    private String encrypt(String text, String Key) {
        try {
            AES AESEncryptor = new AES(Key);
            return AESEncryptor.encrypt(text);
        } catch (Exception ex) {
            System.out.println(ENCRYPTION_FAILED + ex.getMessage());
            throw new IllegalStateException(ENCRYPTION_FAILED, ex);
        }
    }
}