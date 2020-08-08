const SVGO = require('svgo');

const svgo = new SVGO({
    plugins: [
        { removeDesc: true },
        { removeTitle: true },
        { sortAttrs: true },
        { removeStyleElement: true },
        { removeViewBox: false },
    ],
});

const optimize = svg => svgo.optimize(svg);

module.exports = {
    optimize,
};
