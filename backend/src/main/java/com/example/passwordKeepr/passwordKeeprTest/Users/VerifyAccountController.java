package com.example.passwordKeepr.passwordKeeprTest.Users;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class VerifyAccountController {

    private final LoginService loginService;

    @Autowired
    public VerifyAccountController(LoginService loginService) { this.loginService = loginService; }

    @CrossOrigin(origins = "http://localhost:3000/", maxAge = 90000)
    @GetMapping("/verify")
    public String verifyAccount(@Param("code") String code, Model model) {
        boolean verified = loginService.verify(code);

        String pageTitle = verified ? "Verification Successful! Please login at: " : "Verification failed!";
        model.addAttribute("pageTitle", pageTitle);

        return "register/" + (verified ? "verify_success" : "verify_fail");
    }
}
