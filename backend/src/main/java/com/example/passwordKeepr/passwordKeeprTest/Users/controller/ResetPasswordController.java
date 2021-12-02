package com.example.passwordKeepr.passwordKeeprTest.Users.controller;
import com.example.passwordKeepr.passwordKeeprTest.Users.service.UsersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import java.util.Map;

@RestController
public class ResetPasswordController {

    private final UsersService usersService;

    @Autowired
    public ResetPasswordController(UsersService usersService) {
        this.usersService = usersService;
    }

    @CrossOrigin(origins = "http://localhost:3000/", maxAge = 90000)
    @PostMapping("/resetUsersPassword")
    public String resetUsersPassword(@RequestBody Map<String, Object> lookupRequestObject) throws Exception {
        return usersService.updateUsersPassword(lookupRequestObject);
    }
}
