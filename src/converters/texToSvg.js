const mjAPI = require('mathjax-node');

const DEFAULT_OPTIONS = {
    exSize: 7.265625,
    inline: false,
};

mjAPI.config({
    paths: {
        Ext: `file://${__dirname}/tex-extensions`,
    },
    MathJax: {
        jax: ['input/TeX', 'output/SVG'],
        extensions: [
            'TeX/color.js',
            'TeX/mediawiki-texvc.js',
            'TeX/mhchem.js',
            '[Ext]/symbols.js',
        ],
        SVG: {
            font: 'STIX-Web',
            useGlobalCache: false,
        },
        TeX: {
            noErrors: {
                disabled: true,
            },
        },
        showMathMenu: false,

    },
});

async function convertTexToSvg(texString, options) {
    const opts = { ...DEFAULT_OPTIONS, ...options };
    const { svg, height: exHeight, width: exWidth } = await mjAPI.typeset({
        math: texString,
        format: opts.inline ? 'inline-TeX' : 'TeX',
        svg: true,
        ex: opts.exSize,
    });

    const width = exWidth.replace('ex', '') * opts.exSize;
    const height = exHeight.replace('ex', '') * opts.exSize;

    return {
        markup: svg,
        height,
        width,
    };
}

module.exports = {
    convertTexToSvg,
};
