'use strict';

var groupRoisPerLine = require('./groupRoisPerLine');

module.exports = function getLinesFromImage(image, options = {}) {
    var {
        greyThreshold,
        roiMinSurface,
        roiPositive,
        roiNegative,
        fingerprintWidth,
        fingerprintHeight
    } = options;

    var grey = image.grey({allowGrey: true});
    var mask = grey.mask({threshold: greyThreshold});
    mask.invert();

    var manager = image.getRoiManager();
    manager.fromMask(mask);
    var rois = manager.getRois({
        minSurface: roiMinSurface,
        positive: roiPositive,
        negative: roiNegative
    });

    rois.forEach(function (roi) {
        var small = roi.getMask().scale({width: fingerprintWidth, height: fingerprintHeight});
        roi.data = Array.from(small.data);
    });

    var lines = groupRoisPerLine(rois, {});
    return lines;
};

