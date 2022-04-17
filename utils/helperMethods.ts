var CryptoJS = require("crypto-js");

export function encryptText(text: string, email: string): string {
  return CryptoJS.AES.encrypt(text, email + process.env.SECRET_KEY).toString();
}

export function decryptText(text: string, email: string): string {
  return CryptoJS.AES.decrypt(text, email + process.env.SECRET_KEY).toString(
    CryptoJS.enc.Utf8
  );
}

export function hashText(text: string): string {
  return CryptoJS.SHA3(text).toString(CryptoJS.enc.Base64);
}
