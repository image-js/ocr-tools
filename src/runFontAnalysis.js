'use strict';

const doOcrOnLines = require('./util/doOcrOnLines');
const getLinesFromImage = require('./util/getLinesFromImage');

module.exports = function runFontAnalysis(image, allFontData, options = {}) {
  const lines = getLinesFromImage(image, options).lines;

  var fingerprintOptions = Object.assign({}, options.fingerprintOptions, {
    minSimilarity: 0.9
  });

  const results = [];
  for (const fontData of allFontData) {
    var result = doOcrOnLines(lines, fontData, fingerprintOptions);
    result.fontName = fontData.font;
    results.push(result);
  }

  return results.sort((a, b) => b.totalSimilarity - a.totalSimilarity);
};
