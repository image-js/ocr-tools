var roiOptions={
    minSurface: 10, // should get of the '.' over the i
    positive: true,
    negative: false
};


var generateSymbolImage=require('../src/util/generateSymbolImage');
var groupRoisPerLine=require('../src/util/groupRoisPerLine');
var symbols=require('../src/util/symbolClasses').NUMBERS;
var tanimotoSimilarity=require('../src/util/tanimotoSimilarity');
var byteArrayToBinary=require('../src/util/byteArrayToBinary');
var appendFingerprints=require('../src/util/appendFingerprints');
var bestMatch=require('../src/util/bestMatch');

var options={
    symbols: symbols,
    size: 48,
    numberPerLine: 11
};

var image=generateSymbolImage(options);

var grey=image.grey();
var mask=grey.mask({threshold: 0.5});
mask.invert();


image.save('image.png');
grey.save('grey.png');
mask.save('mask.png');


var manager = image.getRoiManager();
manager.fromMask(mask);
var rois=manager.getRois(roiOptions);


// Append the data of the mask
rois.forEach(function(roi) {
    var small=roi.getMask().scale({width:8, height:8});
    roi.data=Array.from(small.data);
});

var lines=groupRoisPerLine(rois, {});


// we have the lines in the correct order, it should match directly the font
for (var i=0; i<lines.length; i++) {
    var line=lines[i];
    line.symbol=String.fromCharCode(options.symbols[i]);
    if (line.rois.length!==options.numberPerLine) {
        console.log('Length not equal for '+line.symbol);
    }
}


appendFingerprints(lines);
debugFingerprints(lines);

for (var line of lines) {
    console.log('-------------------',line.symbol,'---------------');
    var theBestMatch=bestMatch(line.fingerprints[4], lines);
    console.log(theBestMatch.symbol, theBestMatch.similarity);
}


// need to calculate the fingerprint for each character
// DEBUG procedure to check the binary string generated. Works better with 8 bits ...
if (false) {
    var zero = '0'.repeat(10);
    for (var i = 0; i < lines.length; i++) {
        var line = lines[i];
        console.log(line.symbol);
        var data = line.rois[0].data;
        for (var datum of data) {
            var binary = datum.toString(2);
            console.log(zero.substring(0, 8 - binary.length) + binary);
        }
    }
}


// we calculate the similarity between the symbols
if (false) {
    var middle=Math.floor((options.numberPerLine-1)/2);
    for (var i = 0; i < lines.length; i++) {
        var line = lines[i];
        var rois=line.rois;
        for (var j=0; j<rois.length; j++) {
            var similarity = tanimotoSimilarity(rois[middle].data, rois[j].data);
            console.log(similarity);
        }
    }
}





function debugFingerprints(lines) {
    for (var line of lines) {
        console.log('------------------',line.symbol,'----------------');
        console.log('Number of fingerprints: ',line.fingerprints.length);
        for (var fingerprint of line.fingerprints) {
            console.log(byteArrayToBinary(fingerprint));
        }
    }
}

