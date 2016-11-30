const tanimotoSimilarity = require('../src/util/tanimotoSimilarity');
var createFontFingerprint=require('../src/createFontFingerprint');
var symbols=require('../src/util/symbolClasses').MRZ;  // SYMBOLS MRZ NUMBERS
var saveFingerprint=require('../src/util/saveFingerprint');
var getInstalledRegularFonts=require('../src/util/getInstalledRegularFonts');


var fonts=getInstalledRegularFonts();

var fonts=['ocrb'];

var options={
    roiMinSurface: 40,  // should allow to remove the '.' of i
    roiPositive: true,
    roiNegative: false,
    symbols: symbols.symbols,
    fontSize: 48,  // font size we use at the beginning
    font: '',
    numberPerLine: 11,
    allowedRotation: 2,
    greyThreshold: [0.4, 0.5, 0.6, 0.7],
    fingerprintWidth: 12,
    fingerprintHeight: 12,
    fingerprintMaxSimilarity:0.95 // we store all the different fingerprints
};

for (var font of fonts) {
    options.font=font;

    // we can allow many greyThreshold in order to simulate 'bold'
    var greyThresholds=options.greyThreshold;
    if (! Array.isArray(greyThresholds)) {
        greyThresholds=[greyThresholds]
    };

    var allFingerprints=[];
    for (var greyThreshold of greyThresholds) {
        options.greyThreshold=greyThreshold;
        var fingerprint=createFontFingerprint(options);

        console.log(fingerprint.valid);
        
        if (fingerprint.valid) {
            allFingerprints.push(fingerprint);
        }
    }

    
    
    var results=joinFingerprints(allFingerprints, {maxSimilarity: options.fingerprintMaxSimilarity});
    if (results.length>0) {
        saveFingerprint(options.font, results, {
            width:options.fingerprintWidth,
            height:options.fingerprintHeight,
            category:symbols.label
        });
    }
}


/*
We have an array of fingerprints and we flatten it
 */
function joinFingerprints(allFingerprints, options={}) {
    var {
        maxSimilarity
    } = options;
    var symbols={};
    for (var oneFingerprint of allFingerprints) {
        var results=oneFingerprint.results;
        for (var result of results) {
            // result is composed of a symbol and the related fingerprints
            if (! symbols[result.symbol]) {
                symbols[result.symbol]=[];
            }
            for (const newFingerprint of result.fingerprints) {
                var isNew = true;
                for (const existingFingerprint of symbols[result.symbol]) {
                    if (tanimotoSimilarity(existingFingerprint,newFingerprint) >= maxSimilarity) {
                        isNew = false;
                        break;
                    }
                }
                if (isNew) {
                    console.log(result.symbol);
                    symbols[result.symbol].push(newFingerprint);
                }
            }
        }
    }
    var toReturn=[];
    for (var symbol of Object.keys(symbols)) {
        toReturn.push({
            symbol: symbol,
            fingerprints: symbols[symbol]
        });
    }
    for (var ab of toReturn) {
        console.log(ab.symbol, ab.fingerprints.length);
    }
    
    return toReturn;
}
