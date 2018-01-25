'use strict';

module.exports = function getFingerprintsName(options = {}) {
  var {
    width = 8,
    height = 8,
    category = '',
    fontName = 'helvetica'
  } = options;

  fontName = fontName.toLowerCase().replace(/[^a-zA-Z0-9]/g, '_');
  fontName = fontName.replace(/_?regular$/, '');

  const kind = `${width}x${height}`;
  return {
    folder: `fontFingerprint/${kind}/${category}/`,
    name: `${fontName}.json`
  };
};

