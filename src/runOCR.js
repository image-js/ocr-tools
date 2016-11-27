module.exports=function runOCR(image, fingerprint, options) {
    
    var options={
        roiMinSurface: 10,
        roiPositive: true,
        roiNegative: false,
        greyThreshold: 0.5,
        fingerprintMinSimilarity:0.8 // minimal similarity to consider the result
    };
    

    for (var line of lines) {
        console.log('------------------',line.symbol,'----------------');
        console.log('Number of fingerprints: ',line.fingerprints.length);
        for (var fingerprint of line.fingerprints) {
            console.log(byteArrayToBinary(fingerprint));
        }
    }
}

