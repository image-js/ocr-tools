'use strict';


const runOCR=require('../src/runOCR');
const IJS=require('image-js');
const loadFingerprint=require('../src/util/loadFingerprint');
const symbols=require('../src/util/symbolClasses').MRZ;  // SYMBOLS MRZ NUMBERS

var options={
    roiMinSurface: 30,
    roiPositive: true,
    roiNegative: false,
    fingerprintHeight: 12,
    fingerprintWidth: 12,
    greyThreshold: 0.5,
    font: 'ocrb', // dejavusans ocrb iwona
    fingerprintMinSimilarity:0.5 // minimal similarity to consider the result
};




var fingerprints=loadFingerprint(options.font, {
    width: options.fingerprintHeight,
    height: options.fingerprintHeight,
    category: symbols.label
});

IJS.load('private/1.png').then(function(image) {
//IJS.load('demo/ocrb.png').then(function(image) {
    var result=runOCR(image, fingerprints, options);

    for (var line of result.lines) {
        console.log(line.text, line.similarity, ' Found:',line.found, ' Not found:',line.notFound);
    }
    console.log('Total similarity',result.totalSimilarity);
    console.log('Total found',result.totalFound);
    console.log('Total not found',result.totalNotFound);
    
    // for the first line we just show the roi
    for (var roi of result.lines[1].rois) {
        console.log(JSON.stringify(roi));
}

});








