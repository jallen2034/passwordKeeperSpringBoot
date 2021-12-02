package com.example.passwordKeepr.passwordKeeprTest.Passwords;
import com.example.passwordKeepr.passwordKeeprTest.Users.User;
import com.example.passwordKeepr.passwordKeeprTest.Users.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Map;

@Service
public class EditPasswordService {

    private final PasswordsRepository passwordsRepository;
    private final UsersRepository usersRepository;

    @Autowired
    EditPasswordService(PasswordsRepository passwordsRepository, UsersRepository usersRepository) {
        this.passwordsRepository = passwordsRepository;
        this.usersRepository = usersRepository;
    }

    public <lookupRequestObject> String editPasswordForUser(Map<String, Object> lookupRequestObject) throws Exception {
        String uuid = (String) lookupRequestObject.get("sessionUuid");
        String passwordUrl = (String) lookupRequestObject.get("passwordUrl");
        String newPassword = (String) lookupRequestObject.get("newPassword");
        int id = (int) lookupRequestObject.get("id");
        User userFromDb = usersRepository.findByUuid(uuid);
        String usersMastePassword = userFromDb.getMasterPassword();

        if (userFromDb == null) {
            throw new IllegalStateException("You can't edit a password for someone who doesn't exist!");
        }

        List passwordList = userFromDb.getPasswordList();

        for (int i = 0; i < passwordList.size(); i++) {
            Password passwordInLoop = (Password) passwordList.get(i);
            int passwordId = passwordInLoop.getId();

            if (passwordId == id) {
                try {
                    String encryptedPassword = encryptPassword(newPassword, usersMastePassword);
                    passwordsRepository.editPassword(uuid, passwordUrl, encryptedPassword);
                } catch (EmptyResultDataAccessException ex) {
                    throw new IllegalStateException("Uh oh, database shenanigans!");
                }

                return newPassword;
            }
        }

        return "Uh oh, something went wrong when editing that password!";
    }

    private String encryptPassword(String newPassword, String Key) throws Exception {
        AES AESEncryptor = new AES(Key);
        String decryptedPassword = AESEncryptor.encrypt(newPassword);
        return decryptedPassword;
    }
}
