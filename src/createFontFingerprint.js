var generateSymbolImage=require('../src/util/generateSymbolImage');
var groupRoisPerLine=require('../src/util/groupRoisPerLine');
var symbols=require('../src/util/symbolClasses').NUMBERS;
var appendFingerprints=require('../src/util/appendFingerprints');

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

    var grey=image.grey();
    var mask=grey.mask({threshold: greyThreshold});
    mask.invert();

    var manager = image.getRoiManager();
    manager.fromMask(mask);
    var rois=manager.getRois({
        minSurface: roiMinSurface,
        positive: roiPositive,
        negative: roiNegative
    });

    rois.forEach(function(roi) {
        var small=roi.getMask().scale({width:fingerprintWidth, height:fingerprintHeight});
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
