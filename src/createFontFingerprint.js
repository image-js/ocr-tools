var generateSymbolImage=require('../src/util/generateSymbolImage');
var SYMBOLS=require('../src/util/symbolClasses').MRZ;
var appendFingerprints=require('../src/util/appendFingerprints');
var getLinesFromImage=require('./util/getLinesFromImage');


module.exports=function createFontFingerprint(options={}) {
    var {
        roiMinSurface=10,
        roiPositive=true,
        roiNegative=false,
        symbols=SYMBOLS.symbols,
        fontSize=48,
        font='Helvetica',
        numberPerLine=11, // better a odd number to allow straight characters during rotation
        greyThreshold=0.5,
        allowedRotation=2, // we allow plus minus 2 degree of rotation
        fingerprintWidth=8,
        fingerprintHeight=8,
        fingerprintMaxSimilarity=1 // we store all the different fingerprints
    } = options;

    var image=generateSymbolImage({
        symbols: symbols,
        size: fontSize,
        font:font,
        numberPerLine: numberPerLine,
        rotation: allowedRotation
    });


    var lines=getLinesFromImage(image, {
            greyThreshold,
            roiMinSurface,
            roiPositive,
            roiNegative,
            fingerprintWidth,
            fingerprintHeight
        }
    );

    var valid=true;
// we have the lines in the correct order, it should match directly the font
    for (var i=0; i<lines.length; i++) {
        var line=lines[i];
        line.symbol=String.fromCharCode(options.symbols[i]);
        if (line.rois.length!==options.numberPerLine) {
            console.log('Number of symbol on the line not correct for: '+line.symbol);
            valid=false;
        }
    }
    if (lines.length!=symbols.length) {
        console.log('Number of lines not correct: ',lines.length, symbols.length);
        valid=false;
    }

    appendFingerprints(lines, {maxSimilarity: fingerprintMaxSimilarity});
    
    var results=lines.map(
        function(line) {
            return {
                symbol: line.symbol,
                fingerprints: line.fingerprints
            }
        }
    );
    return {
        valid,
        results
    };
}
