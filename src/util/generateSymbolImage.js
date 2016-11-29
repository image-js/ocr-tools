'use strict';

const IJS = require('image-js');
const SYMBOLS = require('./symbolClasses').MRZ;

function generateSymbolImage(options = {}) {
    let {
        size = 24,
        numberPerLine = 20,
        rotation = 2,
        font = 'Helvetica',
        backgroundColor = 255,
        symbols = SYMBOLS.symbols
    } = options;


    const grid = Math.floor(size * 1.2);
    font = size + 'px ' + font;

    // default RGBA 8bits
    const image = new IJS(((numberPerLine + 2) * (grid)), (symbols.length + 2) * (grid));

    // the image is now white
    const data = image.data;
    for (let i = 0; i < data.length; i++) {
        if (i % 4 === 3) continue;
        data[i] = backgroundColor;
    }

    const rotate = [];
    const paintOptions = {
        font,
        color: 'black',
        rotate: rotate
    };

    const labels = [];
    const positions = [];


    for (let y = 0; y < symbols.length; y++) {
        const text = String.fromCharCode(symbols[y]);
        for (let x = 0; x < numberPerLine; x++) {
            const position = [x * grid + grid, y * grid + grid];
            positions.push(position);
            labels.push(text);
            rotate.push(
                2 * rotation * x / (numberPerLine - 1) - rotation
            );
        }
    }
    image.paintLabels(labels, positions, paintOptions);
    return image;
}

module.exports = generateSymbolImage;
