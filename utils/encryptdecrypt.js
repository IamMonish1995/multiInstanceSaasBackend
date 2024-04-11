function encrypt(text, key) {
  let encryptedText = "";
  for (let i = 0; i < text.length; i++) {
    let charCode = text.charCodeAt(i);
    let encryptedCharCode = charCode + key.charCodeAt(i % key.length);
    encryptedText += String.fromCharCode(encryptedCharCode);
  }
  return encryptedText;
}

function decrypt(encryptedText, key) {
  let decryptedText = "";
  for (let i = 0; i < encryptedText.length; i++) {
    let charCode = encryptedText.charCodeAt(i);
    let decryptedCharCode = charCode - key.charCodeAt(i % key.length);
    decryptedText += String.fromCharCode(decryptedCharCode);
  }
  return decryptedText;
}