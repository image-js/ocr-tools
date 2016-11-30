/* eslint-disable no-console */
'use strict';

const generateSymbolImage = require('../src/util/generateSymbolImage');
const appendFingerprints = require('../src/util/appendFingerprints');
const getLinesFromImage = require('./util/getLinesFromImage');

module.exports = function createFontFingerprint(options = {}) {
    
    const image = generateSymbolImage(options.imageOptions);
    const lines = getLinesFromImage(image, options);
    


    let valid = true;
// we have the lines in the correct order, it should match directly the font
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        line.symbol = String.fromCharCode(options.symbols[i]);
        if (line.rois.length !== options.numberPerLine) {
            console.log('Number of symbol on the line not correct for: ' + line.symbol);
            valid = false;
        }
    }
    if (lines.length !== symbols.length) {
        console.log('Number of lines not correct: ', lines.length, symbols.length);
        valid = false;
    }

    appendFingerprints(lines, {maxSimilarity: fingerprintMaxSimilarity});

    const results = lines.map(function (line) {
        return {
            symbol: line.symbol,
            fingerprints: line.fingerprints
        };
    });

    return {
        valid,
        results,
        fontName: font
    };
};
