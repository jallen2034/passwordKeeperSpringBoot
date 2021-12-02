package com.example.passwordKeepr.passwordKeeprTest.Users.entity;
import com.example.passwordKeepr.passwordKeeprTest.Passwords.entity.Password;
import javax.persistence.*;
import java.time.LocalDateTime;
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
    private Boolean enabled;
    private String verificationCode;
    private LocalDateTime timestamp_pw_reset;
    private int failed_attempt;
    private Boolean account_locked;
    private LocalDateTime lock_time;
    private LocalDateTime first_failed_attempt_time;

    @OneToMany(fetch = FetchType.LAZY,
        mappedBy = "user",
        cascade = CascadeType.ALL)
    private List<Password> passwordList;

    public User() {
    }

    public User(int id, String email, String master_password, String uuid, Boolean enabled, String verificationCode, LocalDateTime timestamp_pw_reset, int failed_attempt, Boolean account_locked, LocalDateTime lock_time, LocalDateTime first_failed_attempt_time) {
        this.id = id;
        this.email = email;
        this.master_password = master_password;
        this.uuid = uuid;
        this.enabled = enabled;
        this.verificationCode = verificationCode;
        this.timestamp_pw_reset = timestamp_pw_reset;
        this.failed_attempt = failed_attempt;
        this.account_locked = account_locked;
        this.lock_time = lock_time;
        this.first_failed_attempt_time = first_failed_attempt_time;
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

    public Boolean getEnabled() {
        return enabled;
    }

    public void setEnabled(Boolean enabled) {
        this.enabled = enabled;
    }

    public String getVerificationCode() {
        return verificationCode;
    }

    public void setVerificationCode(String verification_code) {
        this.verificationCode = verification_code;
    }

    public void setPasswordList(List<Password> passwordList) {
        this.passwordList = passwordList;
    }

    public LocalDateTime getTimestamp_pw_reset() {
        return timestamp_pw_reset;
    }

    public void setTimestamp_pw_reset(LocalDateTime timestamp_pw_reset) {
        this.timestamp_pw_reset = timestamp_pw_reset;
    }

    public int getFailed_attempt() {
        return failed_attempt;
    }

    public void setFailed_attempt(int failed_attempt) {
        this.failed_attempt = failed_attempt;
    }

    public Boolean getAccount_locked() {
        return account_locked;
    }

    public void setAccount_locked(Boolean account_non_locked) {
        this.account_locked = account_non_locked;
    }

    public LocalDateTime getLock_time() {
        return lock_time;
    }

    public void setLock_time(LocalDateTime lock_time) {
        this.lock_time = lock_time;
    }

    public LocalDateTime getFirst_failed_attempt_time() {
        return first_failed_attempt_time;
    }

    public void setFirst_failed_attempt_time(LocalDateTime first_failed_attempt_time) {
        this.first_failed_attempt_time = first_failed_attempt_time;
    }
}
