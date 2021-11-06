package com.example.passwordKeepr.passwordKeeprTest.Passwords;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class EditPasswordController {

    private final EditPasswordService editPasswordService;

    @Autowired
    public EditPasswordController(EditPasswordService editPasswordService) {
        this.editPasswordService = editPasswordService;
    }

    @CrossOrigin(origins = "http://localhost:3000/", maxAge = 90000)
    @PostMapping("/passwords/edit")
    public String editPassword(@RequestBody Map<String, Object> lookupRequestObject) {
        System.out.println(lookupRequestObject);
        String message = editPasswordService.editPasswordForUser(lookupRequestObject);
        return message;
    }
}