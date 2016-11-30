'use strict';

const tanimotoSimilarity = require('./tanimotoSimilarity');

module.exports = function bestMatch(targetFingerprint, lines) {
    const bestMatch = {
        similarity: 0
    };
    for (const line of lines) {
        for (const fingerprint of line.fingerprints) {
            const similarity = tanimotoSimilarity(fingerprint, targetFingerprint);
            if (similarity >= bestMatch.similarity) {
                bestMatch.similarity = similarity;
                bestMatch.fingerprintOptions = fingerprint;
                bestMatch.symbol = line.symbol;
            }
        }
    }
    return bestMatch;
};
