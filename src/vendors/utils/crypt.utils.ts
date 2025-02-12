import CryptoJS from "crypto-js";

export class CryptUtils {
  public qCrypt(message: any) {
    return CryptoJS.AES.encrypt(message, "ediqiaCryptoByQe").toString();
  }
  // Decrypt
  public qDecrypted = (msgCrypto: any) => {
    const bytes = CryptoJS.AES.decrypt(msgCrypto, "ediqiaCryptoByQe");
    return bytes.toString(CryptoJS.enc.Utf8);
  };

  public qCryptJson = (message: any) => {
    return CryptoJS.AES.encrypt(
      JSON.stringify(message),
      "ediqiaCryptoByQe"
    ).toString();
  };

  public qDecryptedJson = (msgCrypto: any) => {
    const decrypted = CryptoJS.AES.decrypt(msgCrypto, "ediqiaCryptoByQe");
    const bytes = CryptoJS.enc.Utf8.stringify(decrypted);
    return JSON.parse(bytes);
  };
}
