'use strict';

var getFontDataFilename = require('./getFontDataFilename');

var FS = require('fs');

module.exports = function loadFontData(options = {}) {
    var file = getFontDataFilename(options);
    return JSON.parse(FS.readFileSync(file.folder + file.name));
};

