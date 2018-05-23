'use strict';


const runOCR = require('../src/runOCR');

const Image = require('image-js').default;

const loadFontFingerprint = require('../src/util/loadFontData');
const symbols = require('../src/util/symbolClasses').MRZ; // SYMBOLS MRZ NUMBERS

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
    minSimilarity: 0.7,
    fontName: 'ocrb',
    category: symbols.label
  },
};


var fontFingerprint = loadFontFingerprint(options.fingerprintOptions);


Image.load('demo/ocrb.png').then(function (image) {
  var result = runOCR(image, fontFingerprint, options);
  console.log(result);

  for (var line of result.lines) {
    console.log(line.text, line.similarity, ' Found:', line.found, ' Not found:', line.notFound);
  }
  console.log('Total similarity', result.totalSimilarity);
  console.log('Total found', result.totalFound);
  console.log('Total not found', result.totalNotFound);

  // for the first line we just show the roiOptions
  // for (var roi of result.lines[1].rois) {
  //    console.log(JSON.stringify(roiOptions));
  // }
});
