'use strict';

const tanimotoSimilarity = require('../src/util/tanimotoSimilarity');
var createFontFingerprint = require('../src/createFontFingerprint');
var symbols = require('../src/util/symbolClasses').MRZ; // SYMBOLS MRZ NUMBERS
var saveFingerprint = require('../src/util/saveFontData');
var getInstalledRegularFonts = require('../src/util/getInstalledRegularFonts');
var canvas = require('canvas');

canvas.registerFont('OcrB Regular.ttf', {
  family: 'OcrB'
});

var fonts = getInstalledRegularFonts(); //.filter(elem => elem === 'OCRB-Regular');

//fonts=fonts.filter(a=>a.toLowerCase().indexOf('ocr')>=0).slice(0,3);
//fonts=fonts.slice(0,1);

var greyThresholds = [0.3, 0.5, 0.7];

var options = {
  roiOptions: {
    minSurface: 30,
    positive: true,
    negative: false,
    greyThreshold: 0.5
  },
  fingerprintOptions: {
    size: 12,
    category: symbols.label,
    maxSimilarity: 0.95, // we store all the different fontFingerprint
    fontName: ''
  },
  imageOptions: {
    symbols: symbols.symbols,
    fontSize: 48, // font size we use at the beginning
    allowedRotation: 5, // we may rotate the font
    numberPerLine: 11 // better to have a odd number
  }
};

for (var font of fonts) {
  console.log('-----------------> Processing:', font);

  options.fingerprintOptions.fontName = font;

  var fontFingerprintPerThreshold = [];
  for (var greyThreshold of greyThresholds) {
    console.log('Grey threshold', greyThreshold);
    options.roiOptions.greyThreshold = greyThreshold;
    var fontFingerprint = createFontFingerprint(options);
    if (fontFingerprint.valid) {
      fontFingerprintPerThreshold.push(fontFingerprint);
    }
  }

  fontFingerprint = joinFontFingerprints(fontFingerprintPerThreshold, {
    maxSimilarity: options.fingerprintOptions.maxSimilarity
  });
  if (fontFingerprint.length > 0) {
    saveFingerprint(fontFingerprint, options.fingerprintOptions);
  }
}

/*
We have an array of fontFingerprint and we flatten it
 */
function joinFontFingerprints(allFingerprints, options = {}) {
  const { maxSimilarity } = options;
  var symbols = {};
  for (var oneFingerprint of allFingerprints) {
    var results = oneFingerprint.results;
    for (var result of results) {
      // result is composed of a symbol and the related fontFingerprint
      if (!symbols[result.symbol]) {
        symbols[result.symbol] = [];
      }
      for (const newFingerprint of result.fingerprints) {
        var isNew = true;
        for (const existingFingerprint of symbols[result.symbol]) {
          if (
            tanimotoSimilarity(existingFingerprint, newFingerprint) >=
            maxSimilarity
          ) {
            isNew = false;
            break;
          }
        }
        if (isNew) {
          symbols[result.symbol].push(newFingerprint);
        }
      }
    }
  }
  var toReturn = [];
  for (var symbol of Object.keys(symbols)) {
    toReturn.push({
      symbol: symbol,
      fingerprints: symbols[symbol]
    });
  }

  return toReturn;
}
