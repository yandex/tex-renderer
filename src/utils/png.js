const imageminPngquant = require('imagemin-pngquant');

const optimize = input => imageminPngquant()(input);

module.exports = {
    optimize,
};
