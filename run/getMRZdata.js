'use strict';

const IJS = require('image-js').Image;
const fs = require('fs');
const tableify = require('tableify');

const rootDir = '..';
const readPath = rootDir + '/data/id/';
const saveMask = rootDir + '/mask/';
const saveHTMLFile = 'id.html';

const roiOptions = {
    minSurface: 500,
    positive: true,
    negative: false,
    maxWidth: 50,
    //greyThreshold: 0.5,
    randomColors: true
};
const maskOptions = {
    invert: true,
    algorithm: 'isodata'
};

var files = fs.readdirSync(readPath);
var promises = files.map(elem => IJS.load(readPath + elem));
var table = [];

Promise.all(promises).then(function(images) {
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
        table.push({
            image: [
                `<img src="./${readPath + files[i]}" width="600" height="600">`,
                `<img src="./${maskPath}" width="600" height="600">`
            ],
            'Row info median': `<span class='histogram'>${manager.getMap().rowsInfo().map(elem => elem.medianChange).join(',')}</span>`,
            'Col info median': `<span class='histogram'>${manager.getMap().colsInfo().map(elem => elem.medianChange).join(',')}</span>`
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
    )
});
