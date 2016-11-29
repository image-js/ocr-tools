
module.exports=function getFingerprintsName(fontname, options = {}) {

    var {
        width=8,
        height=8,
        category=''
    } = options;

    fontname=fontname.toLowerCase().replace(/[^a-zA-Z0-9]/g,'_');
    fontname=fontname.replace(/_?regular$/,'');

    var fingerprints=[];
    var kind=width+'x'+height;
    return {
        folder: 'fingerprints/'+kind+'/'+category+'/',
        name: fontname+'.json'
    };

};


