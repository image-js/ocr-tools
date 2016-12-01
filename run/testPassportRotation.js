'use strict';

const FS=require('fs');
const runOCR=require('../src/runOCR');
const IJS=require('image-js');
const loadFontFingerprint=require('../src/util/loadFontData');
const symbols=require('../src/util/symbolClasses').MRZ;  // SYMBOLS MRZ NUMBERS

var options={
    roiOptions: {
        minWidth: 5,
        minHeight: 10,
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

var fontFingerprint=loadFontFingerprint(options.fingerprintOptions);


var files = FS.readdirSync('demo');
for (let file of files) {
    if (file.match(/(id|passport)/)) {
       // console.log(file);
    }
}

IJS.load('demo/id7.jpg').then(function(image) {
    image=image.level();
    var rotation=getRotation(image);
    console.log('Best rotation : ',rotation);
});





function getRotation(image) {
    var result=runOCR(image, fontFingerprint, options)
    var bestRotation=0;
    var bestSimilarity=result.totalSimilarity;
    console.log('Total similarity',result.totalSimilarity);
    for (var rotation=90; rotation<360; rotation+=90) {
        var rotated=image.rotate(rotation);
        result=runOCR(rotated, fontFingerprint, options);
        console.log('Total similarity',result.totalSimilarity);

        if (result.totalSimilarity > bestSimilarity) {
            bestRotation=rotation;
            bestSimilarity=result.totalSimilarity;
        }
    }
    return bestRotation;
}