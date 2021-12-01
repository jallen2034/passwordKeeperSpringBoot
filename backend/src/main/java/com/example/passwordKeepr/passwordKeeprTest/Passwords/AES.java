package com.example.passwordKeepr.passwordKeeprTest.Passwords;
import javax.crypto.Cipher;
import javax.crypto.spec.SecretKeySpec;
import java.security.Key;
import org.apache.commons.codec.binary.Base64;

public class AES {

    private static byte[] keyValue = null;
    private static byte[] FinalByteArray = new byte[16];

    public AES(String secretKey) {
        this.keyValue = secretKey.getBytes();
    }

    // only take the first 16 characters or bytes from the password to hashed users email to generate the key
    private static Key generateKey() throws Exception {

        for (int i = 0; i < 16; i++) {
            System.out.println(keyValue[i]);
            FinalByteArray[i] = keyValue[i];
        }

        System.out.println(FinalByteArray);
        return new SecretKeySpec(FinalByteArray, "AES");
    }

    // https://stackoverflow.com/questions/10831801/getting-exception-java-security-invalidkeyexception-invalid-aes-key-length-29/10831960
    public static String encrypt(String passwordToEncrypt) throws Exception {
        Key key = generateKey();
        Cipher cipher = Cipher.getInstance("AES");
        cipher.init(Cipher.ENCRYPT_MODE, key);

        byte[] encryptedValue = cipher.doFinal(passwordToEncrypt.getBytes());
        byte[] encyptedByteValue = new Base64().encode(encryptedValue);
        System.out.println("Encrypted value :: " + new String(encyptedByteValue));

        return new String(encyptedByteValue);
    }

    public static String decrypt(String encryptedValue) throws Exception {
        Key key = generateKey();
        Cipher cipher = Cipher.getInstance("AES");
        cipher.init(Cipher.DECRYPT_MODE, key);

        byte[] decodedBytes = new Base64().decode(encryptedValue.getBytes());
        byte[] decryptedValue = cipher.doFinal(decodedBytes);
        System.out.println("Decrypted value :: " + new String(decryptedValue));

        return new String(decryptedValue);
    }
}
