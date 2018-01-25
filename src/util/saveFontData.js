'use strict';

const getFingerprintName = require('./getFontDataFilename');

const fs = require('fs');
const mkdirp = require('mkdirp');

module.exports = function saveFingerprint(fingerprint, options = {}) {

  const file = getFingerprintName(options);
  mkdirp.sync(file.folder);

  fs.writeFileSync(file.folder + file.name, JSON.stringify(
    {
      font: options.fontName,
      fingerprint
    }
  ));
};
