'use strict';

const getLinesFromImage = require('./util/getLinesFromImage');
const doOcrOnLines = require('./util/doOcrOnLines');

module.exports = function runOCR(image, fontFingerprint, options={}) {
    
    const lines = getLinesFromImage(image, options);

    console.log('-------------',lines.length)

    return doOcrOnLines(lines, fontFingerprint, options.fingerprintOptions);
};
