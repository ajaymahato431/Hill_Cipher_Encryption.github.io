# Hill Cipher Encryption

A lightweight web application that demonstrates 3x3 Hill cipher encryption and decryption in the browser. It uses a fixed key matrix and runs entirely on the client, making it easy to experiment with classical cryptography concepts without installing extra tooling.

## Features

- Fully client-side experience built with plain HTML, CSS, and JavaScript
- Responsive layout that adapts to phones, tablets, and desktops
- Automatic padding so plaintext lengths do not need to be a multiple of three
- Proper round-trip handling of spaces when encrypting and decrypting
- Clean output panels for copying or sharing generated ciphertext

## Key Matrix

The app uses the following 3x3 key matrix for both encryption and decryption:

| 6   | 24  | 1   |
| --- | --- | --- |
| 13  | 16  | 10  |
| 20  | 17  | 15  |

> Note: Only the 26 uppercase English letters are supported. Unsupported characters are stripped during preprocessing.

## Getting Started

### Run locally

1. Clone or download this repository.
2. Serve the project directory with any static file server (for example, `npx serve` or your preferred XAMPP/LAMP stack), or simply open `index.html` directly in a modern browser.
3. Start encrypting and decrypting text blocks right away.

### Project structure

```
index.html   - Encryption UI and markup
decrypt.html - Optional separate page for decryption only
style.css    - Responsive styling for all pages
script.js    - Hill cipher logic and DOM interactions
README.md    - Project documentation (this file)
```

## Usage

1. Open `index.html` in your browser.
2. In the _Encryption_ panel, paste or type plaintext. The script automatically uppercases letters, removes unsupported characters, and pads with spaces as needed.
3. Click **Encrypt** to generate the ciphertext.
4. Paste ciphertext into the _Decryption_ panel and click **Decrypt** to recover the original message. Spaces are restored automatically.

If you prefer a focused interface, `decrypt.html` contains an equivalent workflow dedicated to decryption only.

## Contributing

Issues and pull requests that improve the learning experience, fix bugs, or expand documentation are welcome. Feel free to fork the project and submit suggestions.

## Credits

- **Developed by:** Ajay Mahato (Balkumari College, Bharatpur)
- **Concept by:** Ramesh Khanal (Mathematics Professor)

Enjoy exploring the Hill cipher!
