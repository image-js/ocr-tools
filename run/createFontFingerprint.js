var createFontFingerprint=require('../src/createFontFingerprint');
var symbols=require('../src/util/symbolClasses').MRZ;
var saveFingerprint=require('../src/util/saveFingerprint');
var FS=require('fs');


var fonts=['helvetica','iwona','ocrb','dejavusans'];


var options={
    roiMinSurface: 10,  // should allow to remove the '.' of i
    roiPositive: true,
    roiNegative: false,
    symbols: symbols,
    fontSize: 48,  // font size we use at the beginning
    font: 'Helvetica',
    numberPerLine: 11,
    greyThreshold: 0.5,
    fingerprintWidth: 8,
    fingerprintHeight: 8,
    fingerprintMaxSimilarity:1 // we store all the different fingerprints
}

for (var font of fonts) {
    options.font=font;
    console.log(font);
    var fingerprint=createFontFingerprint(options);
    saveFingerprint(fingerprint, {
        width:options.fingerprintWidth,
        height:options.fingerprintHeight,
        font:options.font
    })
}






