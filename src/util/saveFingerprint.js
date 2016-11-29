'use strict';

const getFingerprintName = require('./getFingerprintName');

const fs = require('fs');
const mkdirp = require('mkdirp');

module.exports = function saveFingerprint(fontname, fingerprint, options = {}) {
    const file = getFingerprintName(fontname, options);
    mkdirp.sync(file.folder);

    fs.writeFileSync(file.folder + file.name, JSON.stringify(fingerprint));
};
