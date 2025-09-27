const MOD = 26;
const BLOCK_SIZE = 3;

const KEY_MATRIX = [
    [6, 24, 1],
    [13, 16, 10],
    [20, 17, 15]
];

const KEY_MATRIX_INVERSE = [
    [8, 5, 10],
    [21, 8, 21],
    [21, 12, 8]
];

function mod(value) {
    return ((value % MOD) + MOD) % MOD;
}

function sanitizePlainText(input) {
    return input
        .toUpperCase()
        .replace(/[^A-Z\s]/g, '')
        .replace(/\s/g, ' ');
}

function sanitizeCipherText(input) {
    return input
        .toUpperCase()
        .replace(/[^A-Z]/g, '');
}

function padToBlockSize(text, padChar) {
    const remainder = text.length % BLOCK_SIZE;
    if (remainder === 0) {
        return { text, padCount: 0 };
    }

    const padCount = BLOCK_SIZE - remainder;
    return { text: text + padChar.repeat(padCount), padCount };
}

function blockToVector(block) {
    return block.split('').map(char => char.charCodeAt(0) - 65);
}

function multiplyMatrixVector(matrix, vector) {
    return matrix.map(row =>
        row.reduce((sum, value, index) => sum + value * vector[index], 0)
    );
}

function applyMatrixToText(source, matrix) {
    let output = '';

    for (let i = 0; i < source.length; i += BLOCK_SIZE) {
        const block = source.slice(i, i + BLOCK_SIZE);
        const vector = blockToVector(block);
        const result = multiplyMatrixVector(matrix, vector).map(mod);
        output += result.map(value => String.fromCharCode(value + 65)).join('');
    }

    return output;
}

function encryptText() {
    const input = document.getElementById('plainText').value;
    let sanitized = sanitizePlainText(input);

    if (!sanitized.length) {
        document.getElementById('cipherText').textContent = '';
        return;
    }

    const { text: paddedPlainText } = padToBlockSize(sanitized, ' ');
    const prepared = paddedPlainText.replace(/ /g, 'Z');
    const encryptedText = applyMatrixToText(prepared, KEY_MATRIX);

    document.getElementById('cipherText').textContent = encryptedText;
}

function decryptText() {
    const input = document.querySelector('.decryption .text').value;
    let sanitized = sanitizeCipherText(input);

    if (!sanitized.length) {
        document.getElementById('dText').textContent = '';
        return;
    }

    const { text: paddedCipherText, padCount } = padToBlockSize(sanitized, 'X');
    let decrypted = applyMatrixToText(paddedCipherText, KEY_MATRIX_INVERSE);

    if (padCount) {
        decrypted = decrypted.slice(0, -padCount);
    }

    // Hill cipher stores spaces as 'Z' placeholders; convert them back before showing the result.
    const formatted = decrypted.replace(/Z/g, ' ').trimEnd();
    document.getElementById('dText').textContent = formatted;
}



