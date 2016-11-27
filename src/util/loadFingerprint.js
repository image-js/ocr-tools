var FS=require('fs');

module.exports=function loadFingerprint(options = {}) {

    var {
        width=8,
        height=8,
        font='helvetica'
    } = options;

    var font=font.toLowerCase().replace(/[^a-zA-Z0-9]/g,'_');
    var kind=width+'x'+height;
    var folder='fingerprints/'+kind+'/';
    var fingerprints=JSON.parse(FS.readFileSync(folder+font+'.json'));

    return fingerprints;
}


