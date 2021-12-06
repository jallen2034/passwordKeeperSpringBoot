package com.example.passwordKeepr.passwordKeeprTest.Passwords.entity;
import com.example.passwordKeepr.passwordKeeprTest.Users.entity.User;
import javax.persistence.*;
import javax.persistence.Entity;

// https://www.youtube.com/watch?v=FR-j3aGPaK8
@Entity
@Table(name = "passwords")
public class Password {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(columnDefinition = "serial")
    private String category;
    private String url;
    private String password_text;
    private boolean pwned;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
    private int organisations_id;

    public Password () {
    }

    public Password(int id, int organisations_id, String category, String url, String password_text, User userFromdb, boolean pwned) {
        this.id = id;
        this.organisations_id = organisations_id;
        this.category = category;
        this.url = url;
        this.password_text = password_text;
        this.user = userFromdb;
        this.pwned = pwned;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getOrganisations_id() {
        return organisations_id;
    }

    public void setOrganisations_id(int organisations_id) {
        this.organisations_id = organisations_id;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getPassword_text() {
        return password_text;
    }

    public void setPassword_text(String password_text) {
        this.password_text = password_text;
    }

    public boolean getPwned() {
        return pwned;
    }

    public void setPwned(boolean pwned) {
        this.pwned = pwned;
    }
}
