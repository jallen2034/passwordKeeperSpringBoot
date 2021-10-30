package com.example.passwordKeepr.passwordKeeprTest.Passwords;
import com.example.passwordKeepr.passwordKeeprTest.Exception.ApiRequestException;
import com.example.passwordKeepr.passwordKeeprTest.Users.User;
import com.example.passwordKeepr.passwordKeeprTest.Users.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Map;

@Service
public class DeletePasswordService {

    private final PasswordsRepository passwordsRepository;
    private final UsersRepository usersRepository;

    @Autowired
    DeletePasswordService(PasswordsRepository passwordsRepository, UsersRepository usersRepository) {
        this.passwordsRepository = passwordsRepository;
        this.usersRepository = usersRepository;
    }

    public <lookupRequestObject> String deletePasswordForUser(Map<String, Object> lookupRequestObject) {
        String uuid = (String) lookupRequestObject.get("sessionUuid");
        String password = (String) lookupRequestObject.get("passwordText");
        User userFromDb = usersRepository.findByUuid(uuid);
        int id = (int) lookupRequestObject.get("id");

        if (userFromDb == null) {
            throw new ApiRequestException("You can't add a password for someone who doesn't exist!");
        }

        List passwordList = userFromDb.getPasswordList();

        for(int i = 0; i < passwordList.size(); i++) {
            Password passwordInLoop = (Password) passwordList.get(i);
            int passwordId = passwordInLoop.getId();

            if (passwordId == id) {
                  passwordsRepository.deletePassword(id);
                  return "The following Password has been deleted: " +  password + " ";
            }
        }
        return "Uh oh, something went wrong when deleting a password!!";
    }
}
