var fontManager = require('font-manager');

var fonts = fontManager.getAvailableFontsSync();

var names=fonts.map(a=>a.postscriptName);
names.sort();


names.forEach(function(a) {
    if (a.toLowerCase().includes('ocr')) {
        console.log(a);
    }
})



// console.log(names);