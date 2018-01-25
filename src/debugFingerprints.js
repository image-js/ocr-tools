/* eslint-disable no-console */
'use strict';

const byteArrayToBinary = require('./util/byteArrayToBinary');

module.exports = function debugFingerprints(lines) {
  for (const line of lines) {
    console.log('------------------', line.symbol, '----------------');
    console.log('Number of fontFingerprint: ', line.fingerprints.length);
    for (const fingerprint of line.fingerprints) {
      console.log(byteArrayToBinary(fingerprint));
    }
  }
};

