var groupRoisPerLine = require('./util/groupRoisPerLine');
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

    var grey=image.grey({allowGrey:true});
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
    
    // we try to analyse each line
    for (var line of lines) {
        line.text='';
        var rois=line.rois;
        for (var roi of rois) {
            var data=roi.data;
            var match=bestMatch(data, fingerprints);
            if (match.similarity>fingerprintMinSimilarity) {
                line.text+=match.symbol;
            } else {
                line.text+='?';
            }
        }
        console.log(line.text);
    }
    
    return lines;
    
}

