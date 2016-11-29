'use strict';

var getFingerprintName = require('./getFingerprintName');

var FS = require('fs');

module.exports = function loadFingerprints(options = {}) {

    var fingerprints = [];

    var folder = getFingerprintName('', options).folder;

    var dir = FS.readdirSync(folder);

    for (var file of dir) {
        fingerprints.push({
            font: file.replace('.json', ''),
            fingerprint: JSON.parse(FS.readFileSync(folder + file))
        });
    }

    return fingerprints;
};

