'use strict';

const getLinesFromImage = require('./util/getLinesFromImage');
const doOcrOnLines = require('./util/doOcrOnLines');

module.exports = function runOCR(image, fontFingerprint, options = {}) {
  const lines = getLinesFromImage(image, options);
  return doOcrOnLines(lines, fontFingerprint, options.fingerprintOptions);
};
