package com.example.passwordKeepr.passwordKeeprTest.Passwords;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

// https://stackoverflow.com/questions/20089031/could-not-extract-resultset-in-hibernate/20097822
@Repository
public interface PasswordsRepository extends JpaRepository<Password, Integer> {
    @Modifying
    @Query(nativeQuery = true,
            value =
                    "delete from passwords where id = :id ")
    List<String> deletePassword(@Param("id") int id);
}
