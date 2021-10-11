package com.example.passwordKeepr.passwordKeeprTest.Users;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import java.util.Map;

// https://stackoverflow.com/questions/55468519/how-to-receive-customized-json-object-in-spring-boot-api-post-method
@RestController
public class RegisterController {

    private final RegisterService regiserService;

    @Autowired
    public RegisterController(RegisterService registerService) {
        this.regiserService = registerService;
    }

    @PostMapping("/register")
    public String registerUsers(@RequestBody Map<String, Object> lookupRequestObject) {
        return regiserService.registerUser(lookupRequestObject);
    }
}