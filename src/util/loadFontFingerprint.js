'use strict';

var getFingerprintName = require('./getFingerprintName');

var FS = require('fs');

module.exports = function loadFingerprint(options = {}) {
    var file = getFingerprintName(options);
    return JSON.parse(FS.readFileSync(file.folder + file.name));
};

