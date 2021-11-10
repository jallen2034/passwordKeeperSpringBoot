package com.example.passwordKeepr.passwordKeeprTest.Passwords;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import javax.transaction.Transactional;

/* https://stackoverflow.com/questions/20089031/could-not-extract-resultset-in-hibernate/20097822
 * https://stackoverflow.com/questions/53728374/could-not-extract-resultset-when-performing-customized-native-query */
@Repository
public interface PasswordsRepository extends JpaRepository<Password, Integer> {
    @Modifying
    @Transactional
    @Query(nativeQuery = true,
            value =
                    "delete from passwords where id = :id ")
    void deletePassword(@Param("id") int id);

    @Modifying
    @Transactional
    @Query(nativeQuery = true,
            value =
                    "update passwords " +
                    "set password_text = :newPassword " +
                    "from users " +
                    "where users.uuid = :uuid and users.id = passwords.user_id and passwords.url = :passwordUrl")
    void editPassword(
            @Param("uuid") String uuid,
            @Param("passwordUrl") String passwordUrl,
            @Param("newPassword") String newPassword
    );
}
