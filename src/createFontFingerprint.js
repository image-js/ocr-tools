var generateSymbolImage=require('../src/util/generateSymbolImage');
var symbols=require('../src/util/symbolClasses').SYMBOL;
var appendFingerprints=require('../src/util/appendFingerprints');
var getLinesFromImage=require('./util/getLinesFromImage');


module.exports=function createFontFingerprint(options={}) {
    var {
        roiMinSurface=10,
        roiPositive=true,
        roiNegative=false,
        symbols=symbols,
        fontSize=48,
        font='Helvetica',
        numberPerLine=11,
        greyThreshold=0.5,
        fingerprintWidth=8,
        fingerprintHeight=8,
        fingerprintMaxSimilarity=1 // we store all the different fingerprints
    } = options;

    var image=generateSymbolImage({
        symbols: symbols,
        size: fontSize,
        font:font,
        numberPerLine: numberPerLine
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

    
// we have the lines in the correct order, it should match directly the font
    for (var i=0; i<lines.length; i++) {
        var line=lines[i];
        line.symbol=String.fromCharCode(options.symbols[i]);
        if (line.rois.length!==options.numberPerLine) {
            console.log('Length not equal for '+line.symbol);
        }
    }

    appendFingerprints(lines, {maxSimilarity: fingerprintMaxSimilarity});
    
    var results=lines.map(
        function(line) {
            return {
                symbol: line.symbol,
                fingerprints: line.fingerprints
            }
        }
    )
    return results;
}
