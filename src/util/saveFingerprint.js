var getFingerprintName = require('./getFingerprintName');

var FS=require('fs');
var mkdirp=require('mkdirp');

module.exports=function saveFingerprint(fontname, fingerprint, options={}) {

    var file=getFingerprintName(fontname, options);
    mkdirp.sync(file.folder);

    FS.writeFileSync(file.folder+file.name, JSON.stringify(fingerprint));
}

