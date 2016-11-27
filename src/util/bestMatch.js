var tanimotoSimilarity=require('./tanimotoSimilarity');

module.exports=function bestMatch(targetFingerprint, lines) {
    var bestMatch={
        similarity:0
    }
    for (var line of lines) {
        for (var fingerprint of line.fingerprints) {
            var similarity=tanimotoSimilarity(fingerprint, targetFingerprint);
            if (similarity>=bestMatch.similarity) {
                bestMatch.similarity=similarity;
                bestMatch.fingerprint=fingerprint;
                bestMatch.symbol=line.symbol;
            };
        }
    }
    return bestMatch;
}

