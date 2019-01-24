/* */
const { publicEncrypt } = require('crypto');
const { readFileSync } = require('fs');

const key = readFileSync('./key');
const decryptFile = readFileSync('./decrypt.js');

console.log(publicEncrypt(key, decryptFile));
