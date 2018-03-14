'use strict';

const fontManager = require('font-manager');

module.exports = function getInstalledRegularFonts() {
  const fonts = fontManager.getAvailableFontsSync();
  let regular = fonts.filter((a) => a.style === 'Regular');

  // this is not really enough ... and we get rid of the font that contains some Bold, Italic or other
  regular = regular.filter(function (a) {
    return a.family.toLowerCase().match('ocr');
    // return !a
    //   .toLowerCase()
    //   .match(/(condensed|light|bold|extra|black|narrow|medium)/);
  });

  console.log(regular);
  return regular.map((a) => a.family).sort();
};
