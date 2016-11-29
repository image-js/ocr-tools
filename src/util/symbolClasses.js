'use strict'

const LETTERS_NUMBERS={symbols: [], label:'lettersNumbers'};
for (var i='0'.charCodeAt(0); i<='9'.charCodeAt(0); i++) LETTERS_NUMBERS.symbols.push(i);
for (var i='A'.charCodeAt(0); i<='Z'.charCodeAt(0); i++) LETTERS_NUMBERS.symbols.push(i);
for (var i='a'.charCodeAt(0); i<='z'.charCodeAt(0); i++) LETTERS_NUMBERS.symbols.push(i);

const NUMBERS={symbols: [], label:'numbers'};
for (var i='0'.charCodeAt(0); i<='9'.charCodeAt(0); i++) NUMBERS.symbols.push(i);

const MRZ={symbols: [], label:'mrz'};
for (var i='0'.charCodeAt(0); i<='9'.charCodeAt(0); i++) MRZ.symbols.push(i);
for (var i='A'.charCodeAt(0); i<='Z'.charCodeAt(0); i++) MRZ.symbols.push(i);
MRZ.symbols.push('<'.charCodeAt(0));

module.exports={
    LETTERS_NUMBERS,
    NUMBERS,
    MRZ
}