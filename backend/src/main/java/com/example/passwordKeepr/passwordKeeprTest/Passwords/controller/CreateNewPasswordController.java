package com.example.passwordKeepr.passwordKeeprTest.Passwords.controller;
import com.example.passwordKeepr.passwordKeeprTest.Passwords.service.CreateNewPasswordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import java.util.Map;

@RestController
public class CreateNewPasswordController {

    private final CreateNewPasswordService createNewPasswordService;

    @Autowired
    public CreateNewPasswordController(CreateNewPasswordService createNewPasswordService) {
        this.createNewPasswordService = createNewPasswordService;
    }

    @CrossOrigin(origins = "http://localhost:3000/", maxAge = 90000)
    @PostMapping("/passwords/create")
    public String createPassword(@RequestBody Map<String, Object> lookupRequestObject) throws Exception {
        System.out.println(lookupRequestObject);
        String message = createNewPasswordService.createPasswordForUser(lookupRequestObject);
        return message;
    }
}
