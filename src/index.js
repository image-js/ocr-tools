'use strict';

module.exports = {
  getLinesFromImage: require('./util/getLinesFromImage'),
  doOcrOnLines: require('./util/doOcrOnLines'),
  groupRoisPerLine: require('./util/groupRoisPerLine'),
  runFontAnalysis: require('./runFontAnalysis')
};
