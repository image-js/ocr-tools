var FS=require('fs');

module.exports=function saveFingerprint(fingerprint, options={}) {
    var {
        width=8,
        height=8,
        font='helvetica',
        category=''
    } = options;

    var font=font.toLowerCase().replace(/[^a-zA-Z0-9]/g,'_');
    var kind=width+'x'+height;

    var folder='fingerprints/'+kind+'/';
    
    if (!FS.existsSync(folder)) {
        FS.mkdirSync(folder);
    }
    
    folder+=category+'/';

    if (!FS.existsSync(folder)) {
        FS.mkdirSync(folder);
    }

    FS.writeFileSync(folder+font+'.json', JSON.stringify(fingerprint));
}

