'use strict';

var getFontDataFilename = require('./getFontDataFilename');

var FS = require('fs');

module.exports = function loadAllFontData(options = {}) {
    
    var fingerprints = [];

    var folder = getFontDataFilename(options).folder;

    var dir = FS.readdirSync(folder);

    for (var file of dir) {
        var fontData=JSON.parse(FS.readFileSync(folder + file));
        fontData.filneme=folder + file;
        fingerprints.push(fontData);
    }

    return fingerprints;
};

