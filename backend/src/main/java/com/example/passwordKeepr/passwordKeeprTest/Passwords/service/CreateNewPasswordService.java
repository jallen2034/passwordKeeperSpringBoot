package com.example.passwordKeepr.passwordKeeprTest.Passwords.service;
import com.example.passwordKeepr.passwordKeeprTest.Passwords.AES;
import com.example.passwordKeepr.passwordKeeprTest.Passwords.Pwned;
import com.example.passwordKeepr.passwordKeeprTest.Passwords.entity.Password;
import com.example.passwordKeepr.passwordKeeprTest.Passwords.repository.PasswordsRepository;
import com.example.passwordKeepr.passwordKeeprTest.Users.entity.User;
import com.example.passwordKeepr.passwordKeeprTest.Users.repository.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Map;

/* https://github.com/GideonLeGrange/haveibeenpwned
 * https://www.youtube.com/watch?v=hhUb5iknVJs */
@Service
public class CreateNewPasswordService {

    private final PasswordsRepository passwordsRepository;
    private final UsersRepository usersRepository;
    private String encryptedPassword;
    private String encryptedUrl;

    @Autowired CreateNewPasswordService(PasswordsRepository passwordsRepository, UsersRepository usersRepository) {
        this.passwordsRepository = passwordsRepository;
        this.usersRepository = usersRepository;
        this.encryptedPassword = null;
        this.encryptedUrl= null;
    }

    public <lookupRequestObject> String createPasswordForUser(Map<String, Object> lookupRequestObject) throws Exception {
        String uuid = (String) lookupRequestObject.get("sessionUuid");
        String password = (String) lookupRequestObject.get("passwordText");
        String category = (String) lookupRequestObject.get("category");
        String url = (String) lookupRequestObject.get("url");
        User userFromDb = usersRepository.findByUuid(uuid);
        String usersMasterPassword = userFromDb.getMasterPassword();
        boolean pwned = Pwned.main(password);

        if (userFromDb == null) {
            throw new IllegalStateException("You can't add a password for someone who doesn't exist!");
        }

        List passwordList = userFromDb.getPasswordList();
        String masterPasswordHash = userFromDb.getMasterPassword();

        for (int i = 0; i < passwordList.size(); i++) {
            Password passwordInLoop = (Password) passwordList.get(i);
            String passwordUrlFromDb = passwordInLoop.getUrl();

            if (passwordUrlFromDb.equals(url)) {
                throw new IllegalStateException("You already created a password for that website!");
            }
        }

        try {
            AES AESEncryptor = new AES(usersMasterPassword);
            encryptedPassword = AESEncryptor.encrypt(password);
            encryptedUrl = AESEncryptor.encrypt(url);
        } catch(Exception e) {
            throw new IllegalStateException("Error encoding the password!");
        }

        Password newPasswordToSave = new Password(0, 1, category, encryptedUrl, encryptedPassword, userFromDb, pwned);
        passwordList.add(newPasswordToSave);
        userFromDb.setPasswordList(passwordList);
        usersRepository.save(userFromDb);
        return "New password has been created!";
    }
}