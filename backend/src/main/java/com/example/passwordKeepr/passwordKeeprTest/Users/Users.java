package com.example.passwordKeepr.passwordKeeprTest.Users;
import javax.persistence.*;

// https://stackoverflow.com/questions/41791802/autoincrement-id-postgresql-and-spring-boot-data-jpa
@Entity // for hibernate
@Table(name = "users") // for the table in our database
public class Users {

    // instance variables that match up with the password table of our db - id autoincrements
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(columnDefinition = "serial")
    private int id;
    private String email;
    private String master_password;

    // default constructor
    public Users() {
    }

    // constructor
    public Users(int id, String email, String master_password) {
        this.id = id;
        this.email = email;
        this.master_password = master_password;
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

    // for debugging
    @Override
    public String toString() {
        return "Users{" +
                ", email='" + email + '\'' +
                ", masterPassword='" + master_password + '\'' +
                '}';
    }
}
