package com.example.passwordKeepr.passwordKeeprTest.Users;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class LoginService {

    private final UsersRepository usersRepository;
    private PasswordEncoder passwordEncoder;

    @Autowired
    public LoginService(UsersRepository usersRepository)  {
        this.usersRepository = usersRepository;
    }

    public <lookupRequestObject> HashMap<String, String> loginUser(Map<String, Object> lookupRequestObject) {
        String email = (String) lookupRequestObject.get("email");
        String password = (String) lookupRequestObject.get("password");

        if (email == "") {
            throw new IllegalStateException("Must provide email!");
        } else if (password == "") {
            throw new IllegalStateException("Must provide password!");
        }

        return this.loginUser(email, password);
    }

    // https://stackoverflow.com/questions/32129123/how-to-convert-boolean-true-or-false-to-string-value-in-groovy
    private HashMap<String, String> loginUser(String email, String password) {
        this.passwordEncoder = new BCryptPasswordEncoder();
        User userFromDb = usersRepository.findByEmail(email);

        if (userFromDb == null) {
            throw new IllegalStateException("We couldn't find an account with that email!");
        }

        boolean matches = passwordEncoder.matches(password, userFromDb.getMasterPassword());

        if (matches == true) {
            String uuid = userFromDb.getUuid();
            String enabled = String.valueOf(userFromDb.getEnabled());
            HashMap<String, String> map = new HashMap<>();
            map.put("uuid", uuid);
            map.put("enabled", enabled);
            List passwordList = userFromDb.getPasswordList();
            System.out.println(passwordList);
            return map;
        } else {
            throw new IllegalStateException("Sorry that password is incorrect!");
        }
    }

    public String verify(String verificationCode) {
        User userToVerify = usersRepository.findByVerificationCode(verificationCode);
        System.out.println("Got here");

        if (userToVerify == null) {
            return "Oops, doesn't look like a valid account exists for this request!";
        } else if (userToVerify.getEnabled()) {
            return "This user has already been verified! Go log in!";
        } else {
            usersRepository.enableUser(userToVerify.getId());
            return "Account successfully verified! Go log in!";
        }
    }
}
