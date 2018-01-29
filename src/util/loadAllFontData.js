'use strict';

var getFontDataFilename = require('./getFontDataFilename');

var fs = require('fs');

module.exports = function loadAllFontData(options = {}) {
  var fingerprints = [];

  var folder = getFontDataFilename(options).folder;

  var dir = fs.readdirSync(folder);

  for (var file of dir) {
    var fontData = JSON.parse(fs.readFileSync(folder + file));
    fontData.filneme = folder + file;
    fingerprints.push(fontData);
  }

  return fingerprints;
};
