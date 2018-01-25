'use strict';

var IJS = require('image-js');
var loadFingerprints = require('../src/util/loadAllFontData');
var runFontAnalysis = require('../src/runFontAnalysis');
var symbols = require('../src/util/symbolClasses').MRZ; // SYMBOLS MRZ NUMBERS


var options = {
  roiOptions: {
    minSurface: 30,
    positive: true,
    negative: false,
    greyThreshold: 0.5
  },
  fingerprintOptions: {
    height: 12,
    width: 12,
    category: symbols.label,
    maxSimilarity: 0.7, // we store all the different fontFingerprint
    fontName: ''
  },
  imageOptions: {
    symbols: symbols.symbols,
    fontSize: 48, // font size we use at the beginning
    allowedRotation: 5, // we may rotate the font
    numberPerLine: 11 // better to have a odd number
  }
};


var allFontFingerprints = loadFingerprints(options.fingerprintOptions);

console.log('Analysing', allFontFingerprints.length, 'different fonts');

IJS.load('demo/ocrb.png').then(function (image) {
  var results = runFontAnalysis(image, allFontFingerprints, options);

  results = results.slice(0, 5);

  for (var result of results) {
    console.log('----------', result.fontName, '--',
      'Total similarity: ', result.totalSimilarity, '-',
      'Total found: ', result.totalFound, '-',
      'Total not found: ', result.totalNotFound);
    for (var line of result.lines) {
      console.log(line.text);
    }

  }
});

