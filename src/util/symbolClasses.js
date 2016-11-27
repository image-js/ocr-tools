'use strict'

const SYMBOLS=[];
for (var i='0'.charCodeAt(0); i<='9'.charCodeAt(0); i++) SYMBOLS.push(i);
for (var i='A'.charCodeAt(0); i<='Z'.charCodeAt(0); i++) SYMBOLS.push(i);
for (var i='a'.charCodeAt(0); i<='z'.charCodeAt(0); i++) SYMBOLS.push(i);

const NUMBERS=[];
for (var i='0'.charCodeAt(0); i<='9'.charCodeAt(0); i++) NUMBERS.push(i);


module.exports={
    SYMBOLS,
    NUMBERS
}