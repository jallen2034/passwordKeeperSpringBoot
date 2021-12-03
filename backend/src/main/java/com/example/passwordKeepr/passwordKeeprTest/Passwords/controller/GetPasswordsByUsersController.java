package com.example.passwordKeepr.passwordKeeprTest.Passwords.controller;
import com.example.passwordKeepr.passwordKeeprTest.Passwords.service.GetPasswordsByUsersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
public class GetPasswordsByUsersController {

    private final GetPasswordsByUsersService getPasswordsByUsersService;

    @Autowired
    public GetPasswordsByUsersController(GetPasswordsByUsersService getPasswordsByUsersService) {
        this.getPasswordsByUsersService = getPasswordsByUsersService;
    }

    @CrossOrigin(origins = "http://localhost:3000/", maxAge = 90000)
    @PostMapping("/passwords")
    public List getPasswordsbyUsers(@RequestBody Map<String, Object> lookupRequestObject) throws Exception {
        System.out.println(lookupRequestObject);
        List passwordsForClient = getPasswordsByUsersService.getPasswordsByUser(lookupRequestObject);
        return passwordsForClient;
    }
}
