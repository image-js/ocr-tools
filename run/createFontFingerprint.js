var createFontFingerprint=require('../src/createFontFingerprint');
var symbols=require('../src/util/symbolClasses').MRZ;  // SYMBOLS MRZ NUMBERS
var saveFingerprint=require('../src/util/saveFingerprint');
var getInstalledRegularFonts=require('../src/util/getInstalledRegularFonts');


var fonts=getInstalledRegularFonts();


var options={
    roiMinSurface: 40,  // should allow to remove the '.' of i
    roiPositive: true,
    roiNegative: false,
    symbols: symbols.symbols,
    fontSize: 48,  // font size we use at the beginning
    font: '',
    numberPerLine: 11,
    allowedRotation: 2,
    greyThreshold: 0.5,
    fingerprintWidth: 12,
    fingerprintHeight: 12,
    fingerprintMaxSimilarity:0.95 // we store all the different fingerprints
}

for (var font of fonts) {
    options.font=font;
    console.log(font);
    var fingerprint=createFontFingerprint(options);
    if (fingerprint.valid) {
        saveFingerprint(options.font, fingerprint.results, {
            width:options.fingerprintWidth,
            height:options.fingerprintHeight,
            category:symbols.label
        }) 
    }
}






