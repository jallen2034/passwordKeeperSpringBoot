package com.example.passwordKeepr.passwordKeeprTest.Passwords;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PasswordsRepository extends JpaRepository<Password, Integer> {

    @Query(nativeQuery = true,
            value =
                    "SELECT url, password_text, category, passwords.id, user_id, organisations_id, organisations.name " +
                            "FROM passwords " +
                            "JOIN organisations ON organisations.id = passwords.organisations_id" +
                            "WHERE passwords.user_id = 1 OR passwords.organisations_id IN " +
                            "(SELECT organisations_id  FROM users_organisations WHERE user_id = 1);")
    List<String> getPasswordsbyUsers (@Param("user_id") int user_id);
}
