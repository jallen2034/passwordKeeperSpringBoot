package com.example.passwordKeepr.passwordKeeprTest.Users.controller;
import com.example.passwordKeepr.passwordKeeprTest.Users.service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
public class VerifyAccountController {

    private final LoginService loginService;

    @Autowired
    public VerifyAccountController(LoginService loginService) { this.loginService = loginService; }

    @CrossOrigin(origins = "http://localhost:3000/", maxAge = 90000)
    @PostMapping("/verify")
    public String verifyAccount(@RequestBody Map<String, Object> lookupRequestObject) {
        String code = (String) lookupRequestObject.get("params");
        String verified = loginService.verify(code);
        return verified;
    }
}
