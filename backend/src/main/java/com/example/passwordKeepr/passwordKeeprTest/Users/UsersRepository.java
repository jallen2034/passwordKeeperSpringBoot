package com.example.passwordKeepr.passwordKeeprTest.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/* data access layer
 * specify what type of object we want this repo to work with
 * and also the ID type for our student object */
@Repository
public interface UsersRepository extends JpaRepository<Users, Integer> {
    public Users findByEmail(String email);
}


