package com.example.passwordKeepr.passwordKeeprTest.Users.controller;
import com.example.passwordKeepr.passwordKeeprTest.Users.service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import javax.mail.MessagingException;
import java.io.UnsupportedEncodingException;
import java.util.Map;

@RestController
public class ResetPasswordSendEmailController {

    private final LoginService loginService;

    @Autowired
    public ResetPasswordSendEmailController(LoginService loginService) {
        this.loginService = loginService;
    }

    @CrossOrigin(origins = "http://localhost:3000/", maxAge = 90000)
    @PostMapping("/resetPasswordSendEmail")
    public String resetPasswordEmail(@RequestBody Map<String, Object> lookupRequestObject) throws MessagingException, UnsupportedEncodingException {
        loginService.resetPasswordEmail(lookupRequestObject);
        return "If an account exists under this email, please check your email inbox for the password reset link!";
    }
}
