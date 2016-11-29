var bestMatch=require('./bestMatch');

module.exports=function doOcrOnLines (lines, fontFingerprint, options={}) {
    
    var {
        minSimilarity=0.8
    } = options;
    
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
            var match=bestMatch(data, fontFingerprint);
            if (match.similarity>minSimilarity) {
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

    // we will create a report
    var report=[];
    for (var line of lines) {
        var rois=[];
        for (var roi of line.rois) {
            rois.push({
                meanX: roi.meanX,
                meanY: roi.meanY,
                width: roi.width,
                height: roi.height,
            })
        }
        report.push({
            text: line.text,
            found: line.found,
            notFound: line.notFound,
            similarity: line.similarity,
            rois: rois
        })
    }
    
    
    return {
        lines: report,
        totalSimilarity,
        totalFound,
        totalNotFound
    };

}

