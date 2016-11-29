'use strict';

const getLinesFromImage = require('./util/getLinesFromImage');
const doOcrOnLines = require('./util/doOcrOnLines');

module.exports = function runOCR(image, fontFingerprint, options) {
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

    return doOcrOnLines(lines, fontFingerprint, {
        minSimilarity: fingerprintMinSimilarity
    });
};
