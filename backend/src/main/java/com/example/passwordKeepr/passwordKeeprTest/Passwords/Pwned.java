package com.example.passwordKeepr.passwordKeeprTest.Passwords;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.net.HttpURLConnection;
import java.net.URISyntaxException;
import java.net.URL;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

/* https://www.youtube.com/watch?v=hhUb5iknVJs
 * Java version of dr. Mike Pound's pwned.py script. original script by @Omid.N.
 * Modified by @jallen2034 to fit requirements for PasswordKeepr */
public class Pwned {

    public static boolean main(String password) throws IOException, URISyntaxException {
        password = password.trim();
        PwnedObject res = lookupPwnedAPI(password);

        if (res.count > 0) {
            return true;
        } else {
            return false;
        }
    }

    public static PwnedObject lookupPwnedAPI(String pwd) throws IOException, URISyntaxException {
        String sha1pwd = null;

        try {
            sha1pwd = sha1(pwd);
        } catch (UnsupportedEncodingException e) {
            System.err.printf("Error while processing pwd : %s%n", pwd);
        }

        // the passwords head (first 5 chars) + url to be fetched
        String head = sha1pwd.substring(0, 5);
        String tail = sha1pwd.substring(5);
        URL url = new URL("https://api.pwnedpasswords.com/range/" + head);

        HttpURLConnection con = (HttpURLConnection) url.openConnection();

        if (con.getResponseCode() != HttpURLConnection.HTTP_OK) {
            throw new RuntimeException(String.format("Error fetching %s : %s", url, con.getResponseCode()));
        }

        BufferedReader res = new BufferedReader(new InputStreamReader(con.getInputStream()));

        // iterating over res lines to find the count of occurrences
        String line = null;
        int count = 0;

        /* generate count of how many times that pwned password has been used by looping through
         * all thehashes in response from API + tail of the original password being checked */
        while ((line = res.readLine()) != null) {
            if (line.split(":")[0].equals(tail)) {
                count = Integer.parseInt(line.split(":")[1]);
            }
        }

        return new PwnedObject(sha1pwd, count);
    }

    /** Returns the upper-cased SHA-1 of the String <code>str</code>
     *
     * @param str the String to be hashed
     * @throws UnsupportedEncodingException
     */
    public static String sha1(String str) throws UnsupportedEncodingException {
        MessageDigest messageDigest = null;
        try {
            messageDigest = MessageDigest.getInstance("SHA-1");
        } catch (NoSuchAlgorithmException e) {
            System.err.println(e.getMessage());
        }

        String sha1pwd = bytesToHex(messageDigest.digest(str.getBytes("utf-8")));
        return sha1pwd;
    }

    // Converts an array of bytes to hex string
    public static String bytesToHex(byte[] bytes) {

        StringBuffer hexStringBuffer = new StringBuffer();

        for (int i = 0; i < bytes.length; i++) {
            char[] hexDigits = new char[2];
            hexDigits[0] = Character.forDigit((bytes[i] >> 4) & 0xF, 16);
            hexDigits[1] = Character.forDigit((bytes[i] & 0xF), 16);
            String byteToHex = new String(hexDigits);

            hexStringBuffer.append(byteToHex);
        }

        return hexStringBuffer.toString().toUpperCase();
    }

    // creates the pwned object
    private static class PwnedObject {
        String sha1pwd;
        int count;

        public PwnedObject(String sha1pwd, int count) {
            this.count = count;
            this.sha1pwd = sha1pwd;
        }
    }
}