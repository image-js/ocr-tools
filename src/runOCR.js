var getLinesFromImage=require('./util/getLinesFromImage');
var bestMatch = require('./util/bestMatch');

module.exports=function runOCR(image, fingerprints, options) {
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
    
    
    // we try to analyse each line
    var totalSimilarity=0;
    var totalFound=0;
    var totalNotFound=0;
    for (var line of lines) {
        line.text='';
        line.similarity=0;
        line.found=0;
        line.notFound=0;
        var rois=line.rois;
        for (var roi of rois) {
            var data=roi.data;
            var match=bestMatch(data, fingerprints);
            if (match.similarity>fingerprintMinSimilarity) {
                line.text+=match.symbol;
                line.similarity+=match.similarity;
                line.found++;
            } else {
                line.text+='?';
                line.notFound++;
            }
        }
        totalSimilarity+=line.similarity;
        totalFound+=line.found;
        totalNotFound+=line.notFound;
    }
    
    return {
        lines,
        totalSimilarity,
        totalFound,
        totalNotFound
    };
    
}

