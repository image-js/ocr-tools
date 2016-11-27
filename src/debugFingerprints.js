var byteArrayToBinary=require('./util/byteArrayToBinary');

module.exports=function debugFingerprints(lines) {
    for (var line of lines) {
        console.log('------------------',line.symbol,'----------------');
        console.log('Number of fingerprints: ',line.fingerprints.length);
        for (var fingerprint of line.fingerprints) {
            console.log(byteArrayToBinary(fingerprint));
        }
    }
}

