/**
 * You need node 8.5.0 to run this script
 */

'use strict';

var rootDir = '..'; // current directory where images will be saved
const readDirectory = rootDir + '/output/'; // images directory to be processed

const codes = {
    "CORRECT": {
        code: 0,
        save: '/correct/'
    },
    "MRZ_PARSE_ERROR":  { // Invalid MRZ given by the parser (data that maybe doesn't have sense)
        code: 1,
        save: '/notParse/'
    },
    "NO_DETECTED_TEXT": { // different sizes of each MRZ line
        code: 2,
        save: '/notDetected/'
    },
    "NOT_FOUND_LETTERS": { // Undetectable letters by runMRZ method
        code: 3,
        save: '/notFound/'
    }
};

var codeNames = Object.keys(codes);

const runMRZ=require('../src/runMRZ');
const IJS = require('image-js').default;
const loadFontFingerprint=require('../src/util/loadFontData');
const symbols=require('../src/util/symbolClasses').MRZ;  // SYMBOLS MRZ NUMBERS
const fs = require('fs');
const parse = require('mrz').parse;

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
        minSimilarity: 0.5,
        fontName: 'ocrb',
        category: symbols.label
    },
};

function saveImage(img, code, filename) {
    var saveDir = rootDir + code.save;

    if(!fs.existsSync(saveDir)) {
        fs.mkdirSync(saveDir);
    }
    fs.copyFileSync(readDirectory + filename, saveDir + filename);
    //img.save(rootDir + code.save + filename);
    return code.code;
}

function isMRZCorrect(image, filename) {
    // console.log('Image size: ',image.width,image.height),
    //console.time('full OCR process');
    var result=runMRZ(image, fontFingerprint, options);
    //console.timeEnd('full OCR process');

    var text = [];
    var size = undefined;
    for (var line of result.lines) {
        text.push(line.text);
        // console.log(line.text, line.similarity, ' Found:',line.found, ' Not found:',line.notFound);
        if(line.notFound) {
            return saveImage(image, codes.NOT_FOUND_LETTERS, filename);
        }
        
        if(size && size !== line.found) {
            return saveImage(image, codes.NO_DETECTED_TEXT, filename);
        } else {
            size = line.found;
        }
    }

    text = text.join('\n');
    /*console.log('Total similarity',result.totalSimilarity);
    console.log('Total found',result.totalFound);
    console.log('Total not found',result.totalNotFound);*/
    
    // for the first line we just show the roiOptions
    /*for (var roi of result.lines[1].rois) {
        console.log(JSON.stringify(roi));
    }*/
    // console.log(`Parsing ${text}`);
    if(!parse(text).isValid) {
        return saveImage(image, codes.MRZ_PARSE_ERROR, filename);
    }

    return saveImage(image, codes.CORRECT, filename);
}

var files = fs.readdirSync(readDirectory);

var fontFingerprint=loadFontFingerprint(options.fingerprintOptions);
var promises = files.map(elem => IJS.load(readDirectory + elem));

Promise.all(promises).then( function (elems) {
    var counters = new Array(Object.keys(codes).length).fill(0);

    //var output = elems.map(elem => isMRZCorrect(elem));
    for (var i = 0; i < elems.length; i++) {
        var elem = elems[i];
        // console.log(`Processing file: ${files[i]}`);
        var code = isMRZCorrect(elem, files[i]);
        counters[code]++;
        
        if(code === codes.CORRECT) {
            console.log(`file: ${files[i]} is correct!`);
        }
    }

    for(i = 0; i < codeNames.length; ++i) {
        var currentCode = codeNames[i];
        console.log(`Elements with code ${currentCode}: ${counters[codes[currentCode].code]}`);
    }

    console.log(`total elements: ${elems.length}`);
});

/*IJS.load(readDirectory + files[0]).then(function(image) {

    console.log('Image size: ',image.width,image.height),
    console.time('full OCR process');

    var result=runMRZ(image, fontFingerprint, options);

    console.timeEnd('full OCR process');

    for (var line of result.lines) {
        console.log(line.text, line.similarity, ' Found:', line.found, ' Not found:',line.notFound);
    }
    console.log('Total similarity',result.totalSimilarity);
    console.log('Total found',result.totalFound);
    console.log('Total not found',result.totalNotFound);
    
    // for the first line we just show the roiOptions
    for (var roi of result.lines[1].rois) {
        console.log(JSON.stringify(roi));
    }

});*/








