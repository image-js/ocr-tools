'use strict';

module.exports = function getFingerprintsName(fontname, options = {}) {
    var {
        width=8,
        height=8,
        category='',
        font='helvetica'
    } = options;

    font = font.toLowerCase().replace(/[^a-zA-Z0-9]/g, '_');
    font = font.replace(/_?regular$/, '');

    const kind = width + 'x' + height;
    return {
        folder: 'fontFingerprint/' + kind + '/' + category + '/',
        name: font + '.json'
    };
};

