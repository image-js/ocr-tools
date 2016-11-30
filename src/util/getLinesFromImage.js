'use strict';

var groupRoisPerLine = require('./groupRoisPerLine');

module.exports = function getLinesFromImage(image, options = {}) {
    const {
        roiOptions,
        fingerprintOptions
    } = options;

    
    var grey = image.grey({allowGrey: true});
    var mask = grey.mask({threshold: roiOptions.greyThreshold});
    mask.invert();

    var manager = image.getRoiManager();
    manager.fromMask(mask);
    var rois = manager.getRois(roiOptions);

    rois.forEach(function (roi) {
        var small = roi.getMask().scale({
            width: fingerprintOptions.width,
            height: fingerprintOptions.height
        });
        roi.data = Array.from(small.data);
    });

    return groupRoisPerLine(rois, roiOptions);
};
