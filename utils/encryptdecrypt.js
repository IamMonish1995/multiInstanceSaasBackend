import CryptoJS from "crypto-js";
import dotenv from "dotenv";
dotenv.config();

// Encrypt JSON object
export function encryptJSON(obj) {
  return new Promise((resolve, reject) => {
    try {
      let key = process.env.JWT_SECRET_KEY;
      const jsonString = JSON.stringify(obj);
      const ciphertext = CryptoJS.AES.encrypt(jsonString, key).toString();
      resolve(ciphertext);
    } catch (error) {
      console.log(error);
      reject("Encryption Failed");
    }
  });
}

// Decrypt JSON object
export function decryptJSON(ciphertext) {
  return new Promise((resolve, reject) => {
    try {
      let key = process.env.JWT_SECRET_KEY;
      const bytes = CryptoJS.AES.decrypt(ciphertext, key);
      const decryptedString = bytes.toString(CryptoJS.enc.Utf8);
      const decryptedObj = JSON.parse(decryptedString);
      resolve(decryptedObj);
    } catch (error) {
      console.log(error);
      reject("Decryption Failed");
    }
  });
}
