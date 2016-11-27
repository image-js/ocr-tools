var fontManager = require('font-manager');

var fonts = fontManager.getAvailableFontsSync();

var names=fonts.map(a=>a.postscriptName);
names.sort();





console.log(names);