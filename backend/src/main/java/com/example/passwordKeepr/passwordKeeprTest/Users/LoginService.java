package com.example.passwordKeepr.passwordKeeprTest.Users;
import com.example.passwordKeepr.passwordKeeprTest.Exception.ApiRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
public class LoginService {

    private final UsersRepository usersRepository;
    private PasswordEncoder passwordEncoder;

    @Autowired
    public LoginService(UsersRepository usersRepository)  {
        this.usersRepository = usersRepository;
    }

    public <lookupRequestObject> String loginUser(Map<String, Object> lookupRequestObject) {
        String email = (String) lookupRequestObject.get("email");
        String password = (String) lookupRequestObject.get("password");

        if (email == "") {
            throw new ApiRequestException("Must provide email!");
        } else if (password == "") {
            throw new ApiRequestException("Must provide password!");
        }

        return this.loginUser(email, password);
    }

    private String loginUser(String email, String password) {
        this.passwordEncoder = new BCryptPasswordEncoder();
        User userFromDb = usersRepository.findByEmail(email);
        boolean matches = passwordEncoder.matches(password, userFromDb.getMasterPassword());

        if (matches == true) {
            String uuid = userFromDb.getUuid();
            List passwordList = userFromDb.getPasswordList();
            System.out.println(passwordList);
            return uuid;
        } else {
            throw new ApiRequestException("Sorry that password is incorrect!");
        }
    }
}
