package com.example.passwordKeepr.passwordKeeprTest.Passwords;
import com.example.passwordKeepr.passwordKeeprTest.Users.User;
import com.example.passwordKeepr.passwordKeeprTest.Users.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Map;

@Service
public class CreateNewPasswordService {

    private final PasswordsRepository passwordsRepository;
    private final UsersRepository usersRepository;
    private String encryptedPassword;

    @Autowired CreateNewPasswordService(PasswordsRepository passwordsRepository, UsersRepository usersRepository) {
        this.passwordsRepository = passwordsRepository;
        this.usersRepository = usersRepository;
        this.encryptedPassword = null;
    }

    public <lookupRequestObject> String createPasswordForUser(Map<String, Object> lookupRequestObject) throws Exception {
        String uuid = (String) lookupRequestObject.get("sessionUuid");
        String password = (String) lookupRequestObject.get("passwordText");
        String category = (String) lookupRequestObject.get("category");
        String url = (String) lookupRequestObject.get("url");
        User userFromDb = usersRepository.findByUuid(uuid);
        String usersMasterPassword = userFromDb.getMasterPassword();

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
        } catch(Exception e) {
            throw new IllegalStateException("Error encoding the password!");
        }

        Password newPasswordToSave = new Password(0, 1, category, url, encryptedPassword, userFromDb);
        passwordList.add(newPasswordToSave);
        userFromDb.setPasswordList(passwordList);
        usersRepository.save(userFromDb);
        return "New password has been created!";
    }
}
