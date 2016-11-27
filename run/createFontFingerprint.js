var createFontFingerprint=require('../src/createFontFingerprint');
var symbols=require('../src/util/symbolClasses').NUMBERS;
var debugFingerprints=require('../src/debugFingerprints');

var options={
    roiMinSurface: 10,
    roiPositive: true,
    roiNegative: false,
    symbols: symbols,
    fontSize: 48,
    font: 'Helvetica',
    numberPerLine: 11,
    greyThreshold: 0.5,
    fingerprintWidth: 8,
    fingerprintHeight: 8,
    fingerprintMaxSimilarity:1 // we store all the different fingerprints
}

var results=createFontFingerprint(options);

console.log(results);

debugFingerprints(results);






