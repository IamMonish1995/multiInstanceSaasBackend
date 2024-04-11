function encrypt(text) {
  let key = process.env.JWT_SECRET_KEY
  let encryptedText = "";
  for (let i = 0; i < text.length; i++) {
    let charCode = text.charCodeAt(i);
    let encryptedCharCode = charCode + key.charCodeAt(i % key.length);
    encryptedText += String.fromCharCode(encryptedCharCode);
  }
  return encryptedText;
}

function decrypt(encryptedText) {
  let key = process.env.JWT_SECRET_KEY
  let decryptedText = "";
  for (let i = 0; i < encryptedText.length; i++) {
    let charCode = encryptedText.charCodeAt(i);
    let decryptedCharCode = charCode - key.charCodeAt(i % key.length);
    decryptedText += String.fromCharCode(decryptedCharCode);
  }
  return decryptedText;
}