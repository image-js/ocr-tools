var FS=require('fs');

module.exports=function loadFingerprint(options = {}) {

    var {
        width=8,
        height=8,
        category=''
    } = options;

    var fingerprints=[];
    
    var kind=width+'x'+height;
    var folder='fingerprints/'+kind+'/'+category+'/';

    var dir=FS.readdirSync(folder);
    
    for (var file of dir) {
        console.log(file);
        fingerprints.push({
            font: file.replace('.json',''),
            fingerprint: JSON.parse(FS.readFileSync(folder + file))
        });
    }
    
    return fingerprints;
}


