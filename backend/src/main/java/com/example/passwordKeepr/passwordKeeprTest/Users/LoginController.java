package com.example.passwordKeepr.passwordKeeprTest.Users;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import java.util.Map;
import java.util.UUID;

@RestController
public class LoginController {

    private final LoginService loginService;

    @Autowired
    public LoginController(LoginService loginService) { this.loginService = loginService; }

    @CrossOrigin(origins = "http://localhost:3000/", maxAge = 90000)
    @PostMapping("/login")
    public UUID loginUsers(@RequestBody Map<String, Object> lookupRequestObject) {
        UUID uuidToClient = loginService.loginUser(lookupRequestObject);
        return uuidToClient;
    }
}
