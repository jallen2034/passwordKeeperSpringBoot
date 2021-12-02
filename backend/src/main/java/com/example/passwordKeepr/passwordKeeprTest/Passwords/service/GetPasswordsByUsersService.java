package com.example.passwordKeepr.passwordKeeprTest.Passwords.service;
import com.example.passwordKeepr.passwordKeeprTest.Passwords.AES;
import com.example.passwordKeepr.passwordKeeprTest.Passwords.entity.Password;
import com.example.passwordKeepr.passwordKeeprTest.Passwords.repository.PasswordsRepository;
import com.example.passwordKeepr.passwordKeeprTest.Users.entity.User;
import com.example.passwordKeepr.passwordKeeprTest.Users.repository.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Map;

@Service
public class GetPasswordsByUsersService {

    private final PasswordsRepository passwordsRepository;
    private final UsersRepository usersRepository;

    @Autowired
    public GetPasswordsByUsersService(PasswordsRepository passwordsRepository, UsersRepository usersRepository) {
        this.passwordsRepository = passwordsRepository;
        this.usersRepository = usersRepository;
    }

    public <lookupRequestObject> List getPasswordsByUser(Map<String, Object> lookupRequestObject) throws Exception {
        String uuid = (String) lookupRequestObject.get("sessionUuid");
        User userFromDb = usersRepository.findByUuid(uuid);
        String usersMasterPassword = userFromDb.getMasterPassword();
        AES AESEncryptor = new AES(usersMasterPassword);

        if (userFromDb == null) {
            throw new IllegalStateException("This user doesn't exist or have any passwords!");
        }

        List passwords = userFromDb.getPasswordList();

        for (int i = 0; i < passwords.size(); i++) {
            Password password = (Password) passwords.get(i);
            String passwordText = password.getPassword_text();
            String url = password.getUrl();
            String decryptedPassword = AESEncryptor.decrypt(passwordText);
            String decryptedUrl = AESEncryptor.decrypt(url);
            password.setPassword_text(decryptedPassword);
            password.setUrl(decryptedUrl);
        }

        return passwords;
    }
}
