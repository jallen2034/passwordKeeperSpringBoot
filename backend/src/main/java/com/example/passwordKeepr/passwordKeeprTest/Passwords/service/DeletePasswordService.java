package com.example.passwordKeepr.passwordKeeprTest.Passwords.service;
import com.example.passwordKeepr.passwordKeeprTest.Passwords.entity.Password;
import com.example.passwordKeepr.passwordKeeprTest.Passwords.repository.PasswordsRepository;
import com.example.passwordKeepr.passwordKeeprTest.Users.entity.User;
import com.example.passwordKeepr.passwordKeeprTest.Users.repository.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Map;

// https://stackoverflow.com/questions/39233648/jpa-emptyresultdataaccessexception-handling
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
            throw new IllegalStateException("You can't add a password for someone who doesn't exist!");
        }

        List passwordList = userFromDb.getPasswordList();

        for (int i = 0; i < passwordList.size(); i++) {
            Password passwordInLoop = (Password) passwordList.get(i);
            int passwordId = passwordInLoop.getId();

            if (passwordId == id) {
                try {
                    passwordsRepository.deletePassword(id);
                } catch (EmptyResultDataAccessException ex) {
                    throw new IllegalStateException("Uh oh, database shenanigans!");
                }

                return "Password deleted: " +  password + " ";
            }
        }

        return "Uh oh, something went wrong when deleting a password!!";
    }
}
