// Hill Cipher Encryption Function
function encryptText() {
    const plainText = document.getElementById('plainText').value.toUpperCase().replace(/[^A-Z\s]/g, ''); // Get and preprocess input text, including spaces
    const key = [[6, 24, 1], [13, 16, 10], [20, 17, 15]]; // Example key matrix
  
    let encryptedText = '';
  
    // Perform encryption
    for (let i = 0; i < plainText.length; i += 3) {
      const block = plainText.substring(i, i + 3); // Take blocks of 3 characters
      const blockVec = block.split('').map(char => (char === ' ' ? -1 : char.charCodeAt(0) - 65)); // Convert block to numerical representation, -1 for space
  
      // Multiply key matrix with block vector
      const result = [
        key[0][0] * blockVec[0] + key[0][1] * blockVec[1] + key[0][2] * blockVec[2],
        key[1][0] * blockVec[0] + key[1][1] * blockVec[1] + key[1][2] * blockVec[2],
        key[2][0] * blockVec[0] + key[2][1] * blockVec[1] + key[2][2] * blockVec[2],
      ];
  
      // Modulo 26 to stay within the 26-letter alphabet
      for (let j = 0; j < result.length; j++) {
        result[j] = result[j] % 26;
        if (result[j] < 0) result[j] += 26;
      }
  
      // Convert back to letters and form encrypted text
      encryptedText += result.map(val => (val === -1 ? ' ' : String.fromCharCode(val + 65))).join('');
    }
  
    document.getElementById('cipherText').textContent = encryptedText; // Display encrypted text
  }
  

// Hill Cipher Decryption Function
function decryptText() {
    const cipherText = document.querySelector('.decryption .text').value.toUpperCase().replace(/[^A-Z\s]/g, ''); // Get and preprocess input cipher text, including spaces
    const key = [[6, 24, 1], [13, 16, 10], [20, 17, 15]]; // Example key matrix
  
    let decryptedText = '';
  
    // Perform decryption
    for (let i = 0; i < cipherText.length; i += 3) {
      const block = cipherText.substring(i, i + 3); // Take blocks of 3 characters
      const blockVec = block.split('').map(char => (char === ' ' ? -1 : char.charCodeAt(0) - 65)); // Convert block to numerical representation, -1 for space
  
      // Calculate inverse of the key matrix
      const det = key[0][0] * (key[1][1] * key[2][2] - key[2][1] * key[1][2]) -
                  key[0][1] * (key[1][0] * key[2][2] - key[1][2] * key[2][0]) +
                  key[0][2] * (key[1][0] * key[2][1] - key[1][1] * key[2][0]);
      
      const detInv = det % 26; // Calculate determinant inverse modulo 26
      let keyInv = [];
  
      // Calculate key matrix inverse
      for (let m = 0; m < 3; m++) {
        keyInv[m] = [];
        for (let n = 0; n < 3; n++) {
          let val = (key[(n+1)%3][(m+1)%3] * key[(n+2)%3][(m+2)%3] - key[(n+1)%3][(m+2)%3] * key[(n+2)%3][(m+1)%3]) % 26;
          val = (val * detInv) % 26;
          keyInv[m][n] = (val < 0) ? val + 26 : val;
        }
      }
  
      // Multiply key inverse matrix with block vector
      const result = [
        keyInv[0][0] * blockVec[0] + keyInv[0][1] * blockVec[1] + keyInv[0][2] * blockVec[2],
        keyInv[1][0] * blockVec[0] + keyInv[1][1] * blockVec[1] + keyInv[1][2] * blockVec[2],
        keyInv[2][0] * blockVec[0] + keyInv[2][1] * blockVec[1] + keyInv[2][2] * blockVec[2],
      ];
  
      // Modulo 26 to stay within the 26-letter alphabet
      for (let j = 0; j < result.length; j++) {
        result[j] = result[j] % 26;
        if (result[j] < 0) result[j] += 26;
      }
  
      // Convert back to letters and form decrypted text
      decryptedText += result.map(val => (val === -1 ? ' ' : String.fromCharCode(val + 65))).join('');
    }
  
    document.getElementById('dText').textContent = decryptedText; // Display decrypted text
  }
  