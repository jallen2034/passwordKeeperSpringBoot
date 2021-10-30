package com.example.passwordKeepr.passwordKeeprTest.Users;
import com.example.passwordKeepr.passwordKeeprTest.Passwords.Password;
import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

/* https://stackoverflow.com/questions/41791802/autoincrement-id-postgresql-and-spring-boot-data-jpa
 * https://attacomsian.com/blog/spring-data-jpa-one-to-many-mapping */
@Entity // for hibernate
@Table(name = "users") // for the table in our database
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(columnDefinition = "serial")
    private String email;
    private String master_password;
    private String uuid;

    @OneToMany(fetch = FetchType.LAZY,
        mappedBy = "user",
        cascade = CascadeType.ALL)
    private List<Password> passwordList;

    public User() {
    }

    public User(int id, String email, String master_password, String uuid) {
        this.id = id;
        this.email = email;
        this.master_password = master_password;
        this.uuid = uuid;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getMasterPassword() {
        return master_password;
    }

    public void setMasterPassword(String masterPassword) {
        this.master_password = masterPassword;
    }

    public String getUuid() { return uuid; }

    public void setUuid(String uuid) { this.uuid = uuid; }

    public List<Password> getPasswordList() {
        return passwordList;
    }

    public void setPasswordList(List<Password> passwordList) {
        this.passwordList = passwordList;
    }
}
