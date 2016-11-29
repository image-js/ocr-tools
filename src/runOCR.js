var getLinesFromImage=require('./util/getLinesFromImage');
var doOcrOnLines = require('./util/doOcrOnLines');

module.exports=function runOCR(image, fontFingerprint, options) {
    var {
        roiMinSurface= 10,
        roiPositive=true,
        roiNegative=false,
        greyThreshold=0.5,
        fingerprintWidth=8,
        fingerprintHeight=8,
        fingerprintMinSimilarity=0.8 // minimal similarity to consider the result
    } = options;
    
    console.log("RUN")
    
    var lines=getLinesFromImage(image, {
            greyThreshold,
            roiMinSurface,
            roiPositive,
            roiNegative,
            fingerprintWidth,
            fingerprintHeight
        }
    );

    return doOcrOnLines(lines, fontFingerprint, {
        minSimilarity: fingerprintMinSimilarity
    });
    
};

