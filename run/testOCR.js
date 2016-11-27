var FS=require('fs');

var runOCR=require('../src/runOCR');
var IJS=require('image-js');

var options={
    roiMinSurface: 10,
    roiPositive: true,
    roiNegative: false,
    greyThreshold: 0.5,
    fingerprintMinSimilarity:0.8 // minimal similarity to consider the result
};

var fingerprintOptions={
    width: 8,
    height: 8,
    font: 'Helvetica'
}

var kind=fingerprintOptions.width+'x'+fingerprintOptions.height;
var folder='fingerprints/'+kind+'/';
var fingerprints=JSON.parse(FS.readFileSync(folder+fingerprintOptions.font+'.json'));



var results=runOCR(image, fingerprints, options);





