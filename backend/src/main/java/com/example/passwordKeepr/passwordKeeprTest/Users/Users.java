package com.example.passwordKeepr.passwordKeeprTest.Users;
import javax.persistence.*;

// this is our model
@Entity // this annotation is for hibernate
@Table(name = "users") // this one is for the table in our database
public class Users {

    @Id  // instance variables that match up with the password table of our database
    private int id;

    @Column(name = "email")  // these represent the columns in our tables of our ORM
    private String email;

    @Column(name = "master_password")
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

    // getters and setters :))
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
