package com.example.passwordKeepr.passwordKeeprTest.Passwords;
import com.example.passwordKeepr.passwordKeeprTest.Users.User;
import com.example.passwordKeepr.passwordKeeprTest.Users.UsersRepository;
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

    public <lookupRequestObject> List getPasswordsByUser(Map<String, Object> lookupRequestObject) {
        String uuid = (String) lookupRequestObject.get("uuid");
        System.out.println(lookupRequestObject);
        User userFromDb = usersRepository.findByUuid(uuid);
        List passwords = userFromDb.getPasswordList();
        return passwords;
    }
}
