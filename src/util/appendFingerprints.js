var tanimotoSimilarity=require('./tanimotoSimilarity');

module.exports=function appendFingerprints(lines, options={}) {
    var {
        maxSimilarity=1  // over this value we don't add the fingerprint
    } = options;

    for (var line of lines) {
        var rois=line.rois;
        if (!line.fingerprints) line.fingerprints=[];
        for (var roi of line.rois) {
            var isNew=true;
            for (var fingerprint of line.fingerprints) {
                if (tanimotoSimilarity(fingerprint, roi.data)>=maxSimilarity) {
                    isNew=false;
                    break;
                };
            }
            if (isNew) {
                line.fingerprints.push(roi.data);
            }
        }
    }
}
