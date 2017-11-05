'use strict';
const IJS = require('image-js').Image;
const fs = require('fs');
const tableify = require('tableify');
const tanimoto = require('ml-distance').similarity.tanimoto;

const rootDir = '..';
const readPath = rootDir + '/data/passport/';
const saveMask = rootDir + '/mask/';
const saveMRZ = rootDir + '/mrz/';
const saveHTMLFile = 'passport.html';

const roiOptions = {
    minSurface: 200,
    positive: true,
    negative: false,
    minRatio: 0.5,
    maxRatio: 2.0
};
const maskOptions = {
    invert: true,
    algorithm: 'isodata'
};

var files = fs.readdirSync(readPath);
var promises = files.map(elem => IJS.load(readPath + elem));
var table = [];
var checkRoi = number => 15 <= number && number <= 50;

function parseInfo(info, roiIds, check) {
    var size = info.length;
    var arr = new Array(size).fill(0);
    for (var i = 0; i < size; ++i) {
        var currentInfo = info[i].positiveRoiIDs;
        for (var j = 0; j < currentInfo.length; j++) {
            var id = parseInt(currentInfo[j]);
            if (roiIds.includes(id)) {
                arr[i]++;
            }
        }
        arr[i] = check(arr[i]) ? info[i].medianChange : 0;
    }

    return arr;
}

function filterManager(manager) {
    var roiIds = manager.getRoiIds(roiOptions);
    var rowsInfo = manager.getMap().rowsInfo();
    //var colsInfo = manager.getMap().colsInfo();

    return {
        rowInfo: parseInfo(rowsInfo, roiIds, checkRoi),
        //colsInfo: parseInfo(colsInfo, roiIds, checkRoi),
    };
}

function getInfo(peakA, peakB) {
    return [Math.abs(peakA.end - peakB.start), peakA.end - peakA.start, peakB.end - peakB.start];
}

function getMRZ(medianHistogram) {
    var peaks = [];
    var start;
    for (var i = 0; i < medianHistogram.length; i++) {
        var element = medianHistogram[i];
        if (element !== 0 && start === undefined) {
            start = i;
        } else if (element === 0 && start) {
            var end = i - 1;
            peaks.push({
                start: start,
                end: end,
                middle: start + ((end - start) / 2)
            });
            start = undefined;
        }
    }

    peaks.reverse();
    var peakEnd = peaks[0];
    var peakStart;
    var similarity;

    if (peaks.length === 2) {
        peakStart = peaks[1];
    } else if (peaks.length > 2) {
        var peak1 = peaks[0];
        var peak2 = peaks[1];
        var peak3 = peaks[2];
        // because I reverse it
        var info1 = getInfo(peak2, peak1);
        var info2 = getInfo(peak3, peak2);
        similarity = tanimoto(info1, info2)
        if (similarity > 0.9) {
            peakStart = peak3;
        } else {
            peakStart = peak2;
        }
    } else {
        throw new RangeError('Not able to find the MRZ');
    }

    return {
        y: peakStart.start,
        height: peakEnd.end - peakStart.start,
        similarity
    };
}

Promise.all(promises).then(function (images) {
    for (var i = 0; i < images.length; i++) {
        var image = images[i];
        var grey = image.grey({allowGrey: true});
        var mask = grey.mask(maskOptions);

        if (!fs.existsSync(saveMask)) {
            fs.mkdirSync(saveMask);
        }

        var maskPath = saveMask + files[i].replace('.png', '.bmp');
        mask.save(maskPath, {
            useCanvas: false,
            format: 'bmp'
        });
        var manager = image.getRoiManager();
        manager.fromMask(mask);

        var {
            rowInfo,
            //colsInfo
        } = filterManager(manager);

        var {
            y,
            height,
            similarity
        } = getMRZ(rowInfo);

        var margin = 0;
        
        var crop = image.crop({
            y: y - margin,
            height: height + 2*margin
        });

        if (!fs.existsSync(saveMRZ)) {
            fs.mkdirSync(saveMRZ);
        }
        var cropPath = saveMRZ + files[i];
        crop.save(cropPath, {
            useCanvas: false,
            format: 'png'
        });

        table.push({
            image: [
                `<img src="./${maskPath}" width="600" height="600">`,
                `<img src="./${cropPath}" width="600" height="200">`,
            ],
            'Row info median': `<span class='histogram'>${rowInfo.join(',')}</span>`,
            'similarity': similarity
            // 'Col info median': `<span class='histogram'>${colsInfo.join(',')}</span>`
        });
    }

    fs.writeFileSync(saveHTMLFile,
        `
        <!DOCTYPE html>
        <html>
        <head>
        <style>
            html *
            {
                font-family: "Courier New", Courier, monospace;
            }
        </style>
        </head>
        <body>
        ${tableify(table)}
        </body>
        <script src="https://code.jquery.com/jquery-3.2.1.js"
        integrity="sha256-DZAnKJ/6XZ9si04Hgrsxu/8s717jcIzLy3oi35EouyE="
        crossorigin="anonymous"></script>
        <script src="https://omnipotent.net/jquery.sparkline/2.1.2/jquery.sparkline.js"></script>
        <script type="text/javascript">
        $(function() {
            /** This code runs when everything has been loaded on the page */
            /* Inline sparklines take their values from the contents of the tag */
            $('.histogram').sparkline('html', {
                type: 'line',
                width: 400,
                height: 100
            }); 
        });
        </script>
        </html>
        `
    );
});
