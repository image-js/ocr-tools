'use strict';

var groupRoisPerLine = require('./groupRoisPerLine');
const mean = require('ml-array-mean');

module.exports = function getLinesFromImage(image, options = {}) {
  const { roiOptions, fingerprintOptions } = options;

  var grey = image.grey({ allowGrey: true });

  // we should allow to make a level without making a level ...
  let maskOptions = {
    invert: true
  };
  if (roiOptions.algorithm) {
    maskOptions.algorithm = roiOptions.algorithm;
  } else if (roiOptions.greyThreshold) {
    let greyThreshold = roiOptions.greyThreshold;
    if (roiOptions.level) {
      // we simulate the level by changing the threshold
      greyThreshold =
        (grey.min[0] + (grey.max[0] - grey.min[0]) * greyThreshold) /
        grey.maxValue;
    }
    maskOptions.threshold = greyThreshold;
  } else {
    throw new Error('no algorithm or greyThreshold provided to apply.');
  }

  var mask = grey.mask(maskOptions);

  var manager = image.getRoiManager();
  manager.fromMask(mask);
  // TODO: change this options until it works
  var rois = manager.getRois(roiOptions);
  var averageSurface = mean(rois.map((elem) => elem.surface));
  var painted = manager.paint(roiOptions);

  rois.forEach(function (roi) {
    var small = roi.getMask().scale({
      width: fingerprintOptions.width,
      height: fingerprintOptions.height
    });
    roi.data = Array.from(small.data);

    // draw bounding boxes
    var mask = roi.getMask();
    var mbr = mask.minimalBoundingRectangle();
    roi.mbr = mbr;
    roi.mbrWidth = getDistance(mbr[0], mbr[1]);
    roi.mbrHeight = getDistance(mbr[1], mbr[2]);
    roi.mbrSurface = roi.mbrWidth * roi.mbrHeight;
    roi.fillingFactor = roi.surface / roi.mbrSurface;

    mbr = mbr.map((point) => [
      point[0] + mask.position[0],
      point[1] + mask.position[1]
    ]);
    painted.paintPolyline(mbr, { color: [255, 0, 0] });
  });

  return {
    lines: groupRoisPerLine(rois, roiOptions),
    painted,
    mask,
    averageSurface
  };
};

function getDistance(p1, p2) {
  return Math.sqrt((p1[0] - p2[0]) ** 2 + (p1[1] - p2[1]) ** 2);
}
