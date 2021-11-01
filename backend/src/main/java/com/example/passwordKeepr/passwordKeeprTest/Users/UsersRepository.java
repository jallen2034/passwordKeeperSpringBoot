package com.example.passwordKeepr.passwordKeeprTest.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/* data access layer - https://docs.spring.io/spring-framework/docs/current/reference/html/data-access.html
 * specify what type of object we want this repo to work with
 * and also the ID type for our student object */
@Repository
public interface UsersRepository extends JpaRepository<User, Integer> {
    public User findByEmail(String email);
    public User findByUuid(String uuid);
}