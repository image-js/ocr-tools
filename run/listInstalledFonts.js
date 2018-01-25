'use strict';

var getInstalledRegularFonts = require('../src/util/getInstalledRegularFonts');


var names = getInstalledRegularFonts();


names = names.filter((a) => a.toLowerCase().indexOf('ocr') >= 0);

console.log(names);

