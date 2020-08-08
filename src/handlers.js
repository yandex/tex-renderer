const { convertTexToSvg } = require('./converters/texToSvg');
const { convertSvgToPng } = require('./converters/svgToPng');
const { optimize: optimizeSVG } = require('./utils/svg');
const { optimize: optimizePng } = require('./utils/png');

const parseQuery = query => {
    const { ex_size: exSize, format = ['svg'], inline = false } = query;
    const opts = {
        format: new Set([].concat(format)),
        inline: Boolean(inline),
    };

    if (exSize) {
        const parsedSize = Number(exSize);
        if (isFinite(parsedSize)) {
            opts.exSize = parsedSize;
        }
    }

    return opts;
};

const prepareSvg = async svgContent => optimizeSVG(svgContent).then(({ data }) => ({ svg: data }));

const preparePng = async(svgContent, options) =>
    convertSvgToPng(svgContent, {
        height: options.height,
        width: options.width,
    })
        .then(result => optimizePng(result))
        .then(result => ({ png: result }));

const send = (data, res) => {
    const formats = Object.keys(data);

    if (formats.length === 1) {
        const format = formats[0];
        res.type(format);
        res.send(data[format]);
        return;
    }

    res.json(data);
};

const processHandler = async function(req, res) {
    const { query } = req;
    const { tex } = query;

    if (!tex) {
        res.json({ error: '"tex" parameter not specified' });
        return;
    }

    try {
        const options = parseQuery(query);
        const { format, ...opts } = options;
        req.logger.info(
            { opts },
            'Данные запроса: tex: %s,', tex,
        );
        const svg = await convertTexToSvg(tex, opts);
        req.logger.info(
            { svg },
            'Результат конвертации в svg',
        );
        const promises = [];

        if (format.has('svg')) {
            promises.push(prepareSvg(svg.markup));
        }

        if (format.has('png')) {
            promises.push(
                preparePng(svg.markup, {
                    height: svg.height,
                    width: svg.width,
                }),
            );
        }

        const data = await Promise.all(promises).then(nodes => Object.assign({}, ...nodes));

        send(data, res);
    } catch (e) {
        req.logger.error(e);
        res.json({ error: e.toString() });
    }
};

module.exports = {
    parseQuery,
    prepareSvg,
    preparePng,
    processHandler,
};
