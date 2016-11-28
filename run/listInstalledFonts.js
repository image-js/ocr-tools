var fontManager = require('font-manager');

var fonts = fontManager.getAvailableFontsSync();

var names=fonts.map(a=>a.postscriptName);
names.sort();

// should not finished by a number like for font with specified size
names=names.filter(a => a.match(/.*[a-zA-Z]$/));

// wihout '-' to test ...
names=names.filter(a => a.match(/^[^-]*$/));


names.forEach(function(a) {
    console.log(a);
    // if (a.toLowerCase().includes('ocr')) {
    //     console.log(a);
    // }
})

var result='[';
names.forEach(a => result+=`"${a}",`);
result=result.substring(0,result.length-1)+']';
console.log(result);

// console.log(names);