'use strict';

var getFingerprintName = require('./getFingerprintName');

var FS = require('fs');

module.exports = function loadFingerprint(fontname, options = {}) {
    var file = getFingerprintName(fontname, options);
    return JSON.parse(FS.readFileSync(file.folder + file.name));
};

