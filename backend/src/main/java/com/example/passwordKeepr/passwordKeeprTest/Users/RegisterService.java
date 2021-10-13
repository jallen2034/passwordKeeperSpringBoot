package com.example.passwordKeepr.passwordKeeprTest.Users;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Map;

// https://stackoverflow.com/questions/32801008/how-to-find-out-if-an-email-already-exist-with-jpa-spring-and-sending-some-error
@Service
public class RegisterService {

    private final UsersRepository usersRepository;

    @Autowired
    public RegisterService(UsersRepository usersRepository) {
        this.usersRepository = usersRepository;
    }

    public <lookupRequestObject> String registerUser(Map<String, Object> lookupRequestObject) {

        String email = (String) lookupRequestObject.get("email");
        String password = (String) lookupRequestObject.get("password");
        String confirmPassword = (String) lookupRequestObject.get("confirmPassword");

        if (email == null) {
            return "Must provide email!";
        } else if (password == null) {
            return "Must provide password!";
        } else if (confirmPassword == null) {
            return "Must provide password confirmation!";
        } else if (password.equals(confirmPassword) == false) {
            return "Password and password confirmation do not match!";
        }

        Users usersFromDb = usersRepository.findByEmail(email);

        if (usersFromDb != null) {
            return "User already registered!";
        } else {
            return "Hello! Account created!";
        }
    }
}
