var FS=require('fs');
var runOCR=require('../src/runOCR');
var IJS=require('image-js');
var loadFingerprints=require('../src/util/loadFingerprint');

var options={
    roiMinSurface: 30,
    roiPositive: true,
    roiNegative: false,
    greyThreshold: 0.5,
    fingerprintMinSimilarity:0.7 // minimal similarity to consider the result
};

var fingerprints=loadFingerprints({
    width: 8,
    height: 8,
    font: 'ocrb' // dejavusans ocrb iwona
});


IJS.load('demo/ocrb.png').then(function(image) {
    var result=runOCR(image, fingerprints, options);
    
    for (var line of result.lines) {
        console.log(line.text, line.similarity, ' Found:',line.found, ' Not found:',line.notFound);
    }
    console.log('Total similarity',result.totalSimilarity);
    console.log('Total found',result.totalFound);
    console.log('Total not found',result.totalNotFound);
});








