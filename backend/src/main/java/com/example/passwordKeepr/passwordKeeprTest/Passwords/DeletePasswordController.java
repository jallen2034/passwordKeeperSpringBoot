package com.example.passwordKeepr.passwordKeeprTest.Passwords;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class DeletePasswordController {

    private final DeletePasswordService deletePasswordService;

    @Autowired
    public DeletePasswordController(DeletePasswordService deletePasswordService) {
        this.deletePasswordService = deletePasswordService;
    }

    @CrossOrigin(origins = "http://localhost:3000/", maxAge = 90000)
    @PostMapping("/passwords/delete")
    public String deletePassword(@RequestBody Map<String, Object> lookupRequestObject) {
        System.out.println(lookupRequestObject);
        String message = deletePasswordService.deletePasswordForUser(lookupRequestObject);
        return message;
    }
}
