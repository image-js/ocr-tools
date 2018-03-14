'use strict';

const LETTERS_NUMBERS = { symbols: [], label: 'lettersNumbers' };
const NUMBERS = { symbols: [], label: 'numbers' };
const MRZ = { symbols: [], label: 'mrz' };

for (let i = '0'.charCodeAt(0); i <= '9'.charCodeAt(0); i++) {
  LETTERS_NUMBERS.symbols.push(i);
  NUMBERS.symbols.push(i);
  MRZ.symbols.push(i);
}
for (let i = 'A'.charCodeAt(0); i <= 'Z'.charCodeAt(0); i++) {
  LETTERS_NUMBERS.symbols.push(i);
  MRZ.symbols.push(i);
}
for (let i = 'a'.charCodeAt(0); i <= 'z'.charCodeAt(0); i++) {
  LETTERS_NUMBERS.symbols.push(i);
}

module.exports = {
  LETTERS_NUMBERS,
  NUMBERS,
  MRZ
};
