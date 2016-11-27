var createFontFingerprint=require('../src/createFontFingerprint');
var symbols=require('../src/util/symbolClasses').NUMBERS;
var debugFingerprints=require('../src/debugFingerprints');
var FS=require('fs');

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


var kind=options.fingerprintWidth+'x'+options.fingerprintHeight;
var folder='fingerprints/'+kind+'/';

if (!FS.existsSync(folder)) {
    FS.mkdirSync(folder);
}

FS.writeFileSync(folder+options.font+'.json',JSON.stringify(results))


debugFingerprints(results);






