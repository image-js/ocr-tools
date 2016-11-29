var createFontFingerprint=require('../src/createFontFingerprint');
var symbols=require('../src/util/symbolClasses').MRZ;  // SYMBOLS MRZ NUMBERS
var saveFingerprint=require('../src/util/saveFingerprint');


var fonts=["ALMFixed","AbyssinicaSIL","AndroidEmoji","CCIcons","CMUSansSerif","CMUTypewriterVariable","Carlito","ChessAlphaDiagram","Comfortaa","ComicNeue","ComicNeueAngular","CourierPrime","Cursor","Cursor","DANTE","DDC_Uchen","DejaVuSans","DejaVuSansCondensed","DejaVuSansMono","DejaVuSerif","DejaVuSerifCondensed","Dingbats","DroidArabicNaskh","DroidSans","DroidSansArabic","DroidSansArmenian","DroidSansDevanagari","DroidSansEthiopic","DroidSansFallback","DroidSansGeorgian","DroidSansHebrew","DroidSansJapanese","DroidSansMono","DroidSansMonoDotted","DroidSansMonoSlashed","DroidSansTamil","DroidSansThai","DroidSerif","EBGaramondInitials","FontAwesome","FontAwesome","FreeMono","FreeMono","FreeMonoBold","FreeMonoBold","FreeMonoBoldOblique","FreeMonoBoldOblique","FreeMonoOblique","FreeMonoOblique","FreeSans","FreeSans","FreeSansBold","FreeSansBold","FreeSansBoldOblique","FreeSansBoldOblique","FreeSansOblique","FreeSansOblique","FreeSerif","FreeSerif","FreeSerifBold","FreeSerifBold","FreeSerifBoldItalic","FreeSerifBoldItalic","FreeSerifItalic","FreeSerifItalic","Jomolhari","KhmerOS","KhmerOScontent","KhmerOSsys","LKLUG","LiberationMono","LiberationSans","LiberationSansNarrow","LiberationSerif","LinBiolinumO","LinBiolinumOB","LinBiolinumOBO","LinBiolinumOI","LinBiolinumOKb","LinLibertineDisplayO","LinLibertineIO","LinLibertineMO","LinLibertineMOB","LinLibertineMOBO","LinLibertineMOO","LinLibertineO","LinLibertineOB","LinLibertineOBI","LinLibertineOI","LinLibertineOZ","LinLibertineOZI","LobsterTwo","Meera","Mingzat","NanumGothic","NanumGothicBold","NanumGothicExtraBold","NanumGothicLight","NewUnicodeFont","NotoKufiArabic","NotoNaskhArabic","NotoNaskhArabicUI","NotoSans","NotoSansArmenian","NotoSansBengali","NotoSansBengaliUI","NotoSansCham","NotoSansDevanagari","NotoSansDevanagariUI","NotoSansEthiopic","NotoSansGeorgian","NotoSansGujarati","NotoSansGujaratiUI","NotoSansGurmukhi","NotoSansGurmukhiUI","NotoSansHebrew","NotoSansKannada","NotoSansKannadaUI","NotoSansKhmer","NotoSansKhmerUI","NotoSansLao","NotoSansLaoUI","NotoSansLisu","NotoSansMalayalam","NotoSansMalayalamUI","NotoSansMyanmar","NotoSansMyanmarUI","NotoSansOriya","NotoSansOriyaUI","NotoSansSinhala","NotoSansTamil","NotoSansTamilUI","NotoSansTelugu","NotoSansTeluguUI","NotoSansThaana","NotoSansThai","NotoSansThaiUI","NotoSansTibetan","NotoSansUI","NotoSerif","NotoSerifArmenian","NotoSerifGeorgian","NotoSerifKhmer","NotoSerifLao","NotoSerifThai","NuosuSIL","OcrB Regular","OpenSans","OpenSymbol","PakTypeNaskhBasic","Phaistos","PunkNova","Quattrocento","QuattrocentoItalic","QuattrocentoSans","StandardSymL","Symbola","UMTypewriter","Ubuntu","Waree","XITS","XITSMath"];


var options={
    roiMinSurface: 40,  // should allow to remove the '.' of i
    roiPositive: true,
    roiNegative: false,
    symbols: symbols.symbols,
    fontSize: 48,  // font size we use at the beginning
    font: '',
    numberPerLine: 11,
    allowedRotation: 2,
    greyThreshold: 0.5,
    fingerprintWidth: 12,
    fingerprintHeight: 12,
    fingerprintMaxSimilarity:0.95 // we store all the different fingerprints
}

for (var font of fonts) {
    options.font=font;
    console.log(font);
    var fingerprint=createFontFingerprint(options);
    if (fingerprint.valid) {
        saveFingerprint(fingerprint.results, {
            width:options.fingerprintWidth,
            height:options.fingerprintHeight,
            font:options.font,
            category:symbols.label
        }) 
    }
}






