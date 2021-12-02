package com.example.passwordKeepr.passwordKeeprTest.Passwords.controller;
import com.example.passwordKeepr.passwordKeeprTest.Passwords.service.DeletePasswordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import java.util.Map;

// TODO - fix this endpoint to use proper DELETE restful naming convention, can't get this working in Spring
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
