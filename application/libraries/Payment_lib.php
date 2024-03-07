<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Payment_lib {

    private static $OPENSSL_CIPHER_NAME = "AES-128-CBC"; //Name of OpenSSL Cipher
    private static $CIPHER_KEY_LEN = 16; //128 bits
    var $CI;

    public function __construct() {
        $this->CI = & get_instance();
    }

    function encrypt($key, $iv, $data) {
        if (strlen($key) < Payment_lib::$CIPHER_KEY_LEN) {
            $key = str_pad("$key", Payment_lib::$CIPHER_KEY_LEN, "0"); //0 pad to len 16
        } else if (strlen($key) > Payment_lib::$CIPHER_KEY_LEN) {
            $key = $key;
        }

        $encodedEncryptedData = base64_encode(openssl_encrypt($data, Payment_lib::$OPENSSL_CIPHER_NAME, $key, OPENSSL_RAW_DATA, $iv));
        $encryptedPayload = $encodedEncryptedData;

        return $encryptedPayload;
    }

    function decrypt($key, $data, $iv) {
        if (strlen($key) < Payment_lib::$CIPHER_KEY_LEN) {
            $key = str_pad("$key", Payment_lib::$CIPHER_KEY_LEN, "0"); //0 pad to len 16
        } else if (strlen($key) > Payment_lib::$CIPHER_KEY_LEN) {
            $key = $key;
        }

        $decryptedData = openssl_decrypt(base64_decode($data), Payment_lib::$OPENSSL_CIPHER_NAME, $key, OPENSSL_RAW_DATA, $iv);

        return $decryptedData;
    }

    function generate_iv() {
        return substr(PG_KEY, 0, 16);
    }
}
