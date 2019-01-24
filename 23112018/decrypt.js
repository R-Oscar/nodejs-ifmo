/* Гарифуллин А. */
const { publicDecrypt } = require('crypto');
const fs = require('fs');

const key = fs.readFileSync('./key');
const secret = fs.readFileSync('./secret');

console.log(publicDecrypt(key, secret).toString());
