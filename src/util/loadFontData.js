'use strict';

var getFontDataFilename = require('./getFontDataFilename');

var fs = require('fs');

module.exports = function loadFontData(options = {}) {
  var file = getFontDataFilename(options);
  return JSON.parse(fs.readFileSync(file.folder + file.name));
};
