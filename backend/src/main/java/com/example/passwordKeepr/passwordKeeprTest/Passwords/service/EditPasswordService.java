package com.example.passwordKeepr.passwordKeeprTest.Passwords.service;
import com.example.passwordKeepr.passwordKeeprTest.Passwords.AES;
import com.example.passwordKeepr.passwordKeeprTest.Passwords.Pwned;
import com.example.passwordKeepr.passwordKeeprTest.Passwords.entity.Password;
import com.example.passwordKeepr.passwordKeeprTest.Passwords.repository.PasswordsRepository;
import com.example.passwordKeepr.passwordKeeprTest.Users.entity.User;
import com.example.passwordKeepr.passwordKeeprTest.Users.repository.UsersRepository;
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
        String newPassword = (String) lookupRequestObject.get("newPassword");
        int id = (int) lookupRequestObject.get("id");
        User userFromDb = usersRepository.findByUuid(uuid);
        String usersMastePassword = userFromDb.getMasterPassword();
        List passwordList = userFromDb.getPasswordList();
        boolean pwned = Pwned.main(newPassword);

        if (userFromDb == null) {
            throw new IllegalStateException("You can't edit a password for someone who doesn't exist!");
        }

        for (int i = 0; i < passwordList.size(); i++) {
            Password passwordInLoop = (Password) passwordList.get(i);
            int passwordId = passwordInLoop.getId();

            if (passwordId == id) {
                try {
                    String encryptedPassword = encrypt(newPassword, usersMastePassword);
                    passwordInLoop.setPassword_text(encryptedPassword);
                    passwordInLoop.setPwned(pwned);
                } catch (EmptyResultDataAccessException ex) {
                    throw new IllegalStateException("Uh oh, database shenanigans!");
                }

                usersRepository.save(userFromDb);
                return newPassword;
            }
        }

        return "Uh oh, something went wrong when editing that password!";
    }

    private String encrypt(String text, String Key) throws Exception {
        AES AESEncryptor = new AES(Key);
        String decryptedText = AESEncryptor.encrypt(text);
        return decryptedText;
    }
}
