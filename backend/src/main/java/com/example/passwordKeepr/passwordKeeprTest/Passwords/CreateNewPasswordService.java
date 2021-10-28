package com.example.passwordKeepr.passwordKeeprTest.Passwords;
import com.example.passwordKeepr.passwordKeeprTest.Exception.ApiRequestException;
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

    @Autowired CreateNewPasswordService(PasswordsRepository passwordsRepository, UsersRepository usersRepository) {
        this.passwordsRepository = passwordsRepository;
        this.usersRepository = usersRepository;
    }

    public <lookupRequestObject> String createPasswordForUser(Map<String, Object> lookupRequestObject) {
        String uuid = (String) lookupRequestObject.get("sessionUuid");
        String password = (String) lookupRequestObject.get("passwordText");
        String category = (String) lookupRequestObject.get("category");
        String url = (String) lookupRequestObject.get("url");
        User userFromDb = usersRepository.findByUuid(uuid);

        if (userFromDb == null) {
            throw new ApiRequestException("You can't add a password for someone who doesn't exist!");
        }

        List passwordList = userFromDb.getPasswordList();
        Password newPasswordToSave = new Password(0, 1, category, url, password, userFromDb);
        passwordList.add(newPasswordToSave);
        userFromDb.setPasswordList(passwordList);
        usersRepository.save(userFromDb);
        return "New password has been created!\n";
    }
}