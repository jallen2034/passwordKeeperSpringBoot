package com.example.passwordKeepr.passwordKeeprTest.Passwords;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PasswordsRepository extends JpaRepository<Password, Integer> {
}
