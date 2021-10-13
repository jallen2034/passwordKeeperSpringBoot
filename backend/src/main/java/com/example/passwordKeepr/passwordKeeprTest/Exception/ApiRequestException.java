package com.example.passwordKeepr.passwordKeeprTest.Exception;

/* this is our custom exception we can throw through our application
 * https://www.youtube.com/watch?v=PzK4ZXa2Tbc&t=659s */
public class ApiRequestException extends RuntimeException {

    public ApiRequestException(String message) {
        super(message);
    }

    public ApiRequestException(String message, Throwable cause) {
        super(message, cause);
    }
}
