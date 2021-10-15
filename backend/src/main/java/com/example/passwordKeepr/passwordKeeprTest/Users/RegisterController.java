package com.example.passwordKeepr.passwordKeeprTest.Users;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import java.util.Map;
import java.util.UUID;

/* https://stackoverflow.com/questions/55468519/how-to-receive-customized-json-object-in-spring-boot-api-post-method
 * https://www.youtube.com/watch?v=hxyp_LkKDdk */
@RestController
public class RegisterController {

    private final RegisterService regiserService;

    @Autowired
    public RegisterController(RegisterService registerService) {
        this.regiserService = registerService;
    }

    @CrossOrigin(origins = "http://localhost:3000/", maxAge = 90000)
    @PostMapping("/register")
    public UUID registerUsers(@RequestBody Map<String, Object> lookupRequestObject) {
        UUID uuidToClient = regiserService.registerUser(lookupRequestObject);
        return uuidToClient;
    }
}
