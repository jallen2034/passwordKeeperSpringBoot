package com.example.passwordKeepr.passwordKeeprTest.Users;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
public class UsersController {

    // instance variable/reference in this users controller class to keep track of the business layer
    private final UsersService usersService;

    // constructor for this controller, we are using the N-Tier design pattern here
    @Autowired
    public UsersController(UsersService usersService) {
        this.usersService = usersService;
    }

    @GetMapping("/getUsers")
    public List<Users> getUsers() {
        return usersService.getUsers();
    }
}
