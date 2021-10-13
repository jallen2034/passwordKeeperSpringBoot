package com.example.passwordKeepr.passwordKeeprTest.Users;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

/* data access layer
 * the service layer is mostly responsible for business logic, we are using the N-Tier design pattern here */
@Service
public class UsersService {

    private final UsersRepository usersRepository;

    @Autowired
    public UsersService(UsersRepository usersRepository) {
        this.usersRepository = usersRepository;
    }

    // method to get all users from database and return them to the /getUsers controller
    public List<Users> getUsers() {
        List<Users> usersFromDb = usersRepository.findAll();
        return usersFromDb;
    }
}
