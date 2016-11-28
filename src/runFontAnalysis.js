var doOcrOnLines = require('./util/doOcrOnLines');
var getLinesFromImage=require('./util/getLinesFromImage');

module.exports=function runFontAnalysis(image, fingerprints, options) {
    var {
        roiMinSurface= 10,
        roiPositive=true,
        roiNegative=false,
        greyThreshold=0.5,
        fingerprintWidth=8,
        fingerprintHeight=8,
        fingerprintMinSimilarity=0.8 // minimal similarity to consider the result
    } = options;
    
    var lines=getLinesFromImage(image, {
            greyThreshold,
            roiMinSurface,
            roiPositive,
            roiNegative,
            fingerprintWidth,
            fingerprintHeight
        }
    );

    var results=[];
    for (var fontFingerprint of fingerprints) {
        var result=doOcrOnLines(lines, fontFingerprint.fingerprint, {
            minSimilarity: fingerprintMinSimilarity
        });
        result.font=fontFingerprint.font;
        results.push(result);
    }
    
    return results.sort((a,b) => b.totalSimilarity-a.totalSimilarity);
};

