package com.example.passwordKeepr.passwordKeeprTest.Users;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Map;

/* data access layer
 * the service layer is mostly responsible for business logic, we are using the N-Tier design pattern here */
@Service
public class UsersService {

    private final UsersRepository usersRepository;

    @Autowired
    public UsersService(UsersRepository usersRepository) {
        this.usersRepository = usersRepository;
    }

    public List<User> getUsers() {
        List<User> usersFromDb = usersRepository.findAll();
        return usersFromDb;
    }

    public String updateUsersPassword(Map<String, Object> lookupRequestObject) {
        String newPassword = (String) lookupRequestObject.get("newPassword");
        String newPasswordConfirm = (String) lookupRequestObject.get("newPasswordConfirm");
        return "test";
    }
}
