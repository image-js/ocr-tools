'use strict';

var groupRoisPerLine = require('./groupRoisPerLine');

module.exports = function getLinesFromImage(image, options = {}) {
    const {
        roiOptions,
        fingerprintOptions
    } = options;

    var grey = image.grey({allowGrey: true});

    // we should allow to make a level without making a level ...
    let greyThreshold=roiOptions.greyThreshold;
    if (roiOptions.level) {
        // we simulate the level by changing the threshold
        greyThreshold=(grey.min[0]+(grey.max[0]-grey.min[0])*greyThreshold)/grey.maxValue;
    }
    var mask = grey.mask({threshold: greyThreshold});
    mask.invert();

    var manager = image.getRoiManager();
    manager.fromMask(mask);
    var rois = manager.getRois(roiOptions);
    var painted=manager.paint(roiOptions);
    painted.save('painted.png');
    rois.forEach(function (roi) {
        var small = roi.getMask().scale({
            width: fingerprintOptions.width,
            height: fingerprintOptions.height
        });
        roi.data = Array.from(small.data);
    });

    return groupRoisPerLine(rois, roiOptions);
};
