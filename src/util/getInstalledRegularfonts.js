var fontManager = require('font-manager');

module.exports=function getInstalledRegularFonts() {
    var fonts = fontManager.getAvailableFontsSync();
    var regular = fonts.filter(a=>a.style=='Regular');


    var names=regular.map(a=>a.postscriptName);
    
    // this is not really enough ... and we get rid of the font that contains some Bold, Italic or other
    names = names.filter(
        function(a) {
            return ! a.toLowerCase().match(/(condensed|light|bold|extra|black|narrow|medium)/)
        }
    );
    
    return names.sort();
}


