const path = require('path');
const Clipper = require('image-clipper');
const Canvas = require('canvas');
const { v4: uuidv4 } = require('uuid');

async function main() {
    var cols = 10;
    var rows = 4;

    const clipperInstance = Clipper();
    clipperInstance.injectNodeCanvas(Canvas);
    const imageInitializedInstance = await new Promise((initalizeResolve) => {
        clipperInstance.image(path.resolve(__dirname, 'input.png'), function () {
            initalizeResolve(this);
        });
    });
    console.log('clipperInstance initalized, starting loops');
    for (var currRow = 0; currRow < rows; currRow++) {
        console.log('current row', currRow);
        for (var currCol = 0; currCol < cols; currCol++) {
            console.log('current column', currCol);
            await new Promise((resolve) => {
                const x = currCol * (240 + 7);
                const y = currRow * (239 + 39);
                const fileName = path.resolve(__dirname, `out/${uuidv4()}.png`);
                console.log('starting cropping process', fileName);
                imageInitializedInstance.crop(x, y, 240, 239)
                    .resize(240, 240)
                    .toFile(fileName, function() {
                        console.log('saved!', fileName);
                        imageInitializedInstance.reset();
                        resolve();
                    });
            })
        }
    }
}

main();
