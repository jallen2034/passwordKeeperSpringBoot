package ErrorMessageConstants;

public class ErrorMessageConstants {

    // Error messages for EditPasswordService class
    public static final String SESSION_UUID_NULL = "Session UUID cannot be null!";
    public static final String USER_NOT_FOUND = "You can't edit a password for someone who doesn't exist!";
    public static final String PASSWORD_EDIT_FAILED = "Password edit failed! Password not found or an error occurred.";
    public static final String PASSWORD_EDIT_ERROR = "An error occurred while editing the password.";
    public static final String ENCRYPTION_FAILED = "Encryption failed: ";

    // Add more error messages as needed for other classes

    // Private constructor to prevent instantiation
    private ErrorMessageConstants() {
        throw new AssertionError("This class should not be instantiated.");
    }
}
