var FS=require('fs');

var runOCR=require('../src/runOCR');
var IJS=require('image-js');
var loadFingerprints=require('../src/util/loadFingerprint');

var options={
    roiMinSurface: 10,
    roiPositive: true,
    roiNegative: false,
    greyThreshold: 0.5,
    fingerprintMinSimilarity:0.8 // minimal similarity to consider the result
};

var fingerprints=loadFingerprints({
    width: 8,
    height: 8,
    font: 'ocrb'
});


IJS.load('demo/ocrb.png').then(function(image) {
    var results=runOCR(image, fingerprints, options);
});








