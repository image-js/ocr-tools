'use strict';

const doOcrOnLines = require('./util/doOcrOnLines');
const getLinesFromImage = require('./util/getLinesFromImage');

module.exports = function runFontAnalysis(image, fingerprints, options) {
    const {
        roiMinSurface = 10,
        roiPositive = true,
        roiNegative = false,
        greyThreshold = 0.5,
        fingerprintWidth = 8,
        fingerprintHeight = 8,
        fingerprintMinSimilarity = 0.8 // minimal similarity to consider the result
    } = options;

    const lines = getLinesFromImage(image, {
        greyThreshold,
        roiMinSurface,
        roiPositive,
        roiNegative,
        fingerprintWidth,
        fingerprintHeight
    }
    );

    const results = [];
    for (const fontFingerprint of fingerprints) {
        const result = doOcrOnLines(lines, fontFingerprint.fingerprintOptions, {
            minSimilarity: fingerprintMinSimilarity
        });
        result.font = fontFingerprint.font;
        results.push(result);
    }

    return results.sort((a, b) => b.totalSimilarity - a.totalSimilarity);
};

