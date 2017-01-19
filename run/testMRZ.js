'use strict';


const runMRZ=require('../src/runMRZ');
const IJS=require('image-js');
const loadFontFingerprint=require('../src/util/loadFontData');
const symbols=require('../src/util/symbolClasses').MRZ;  // SYMBOLS MRZ NUMBERS

var options={
    roiOptions: {
        minSurface: 20,
        positive: true,
        negative: false,
        maxWidth: 50,
        greyThreshold: 0.5,
        level: true // we recalculate the greyThreshold based
                    // on min / max values of the grey image
    },
    fingerprintOptions: {
        height: 12,
        width: 12,
        minSimilarity: 0.7,
        fontName: 'ocrb',
        category: symbols.label
    },
};


var fontFingerprint=loadFontFingerprint(options.fingerprintOptions);

IJS.load('private/id6.png').then(function(image) {

    console.log('Image size: ',image.width,image.height),
    console.time('full OCR process');

    var result=runMRZ(image, fontFingerprint, options);

    console.timeEnd('full OCR process');

    for (var line of result.lines) {
        console.log(line.text, line.similarity, ' Found:',line.found, ' Not found:',line.notFound);
    }
    console.log('Total similarity',result.totalSimilarity);
    console.log('Total found',result.totalFound);
    console.log('Total not found',result.totalNotFound);
    
    // for the first line we just show the roiOptions
    for (var roi of result.lines[1].rois) {
        console.log(JSON.stringify(roi));
    }

});








