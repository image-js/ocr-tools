'use strict';

module.exports = function getFingerprintsName(fontname, options = {}) {
    const {
        width = 8,
        height = 8,
        category = ''
    } = options;

    fontname = fontname.toLowerCase().replace(/[^a-zA-Z0-9]/g, '_');
    fontname = fontname.replace(/_?regular$/, '');

    const kind = width + 'x' + height;
    return {
        folder: 'fingerprints/' + kind + '/' + category + '/',
        name: fontname + '.json'
    };
};

