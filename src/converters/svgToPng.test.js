const path = require('path');
const { convertSvgToPng } = require('./svgToPng');
const { matchBinary, getFixture } = require('../utils/test');

const matchSnapshot = matchBinary(path.join(process.cwd(), '__fixtures__', 'png'));
const getSvg = getFixture(path.join(process.cwd(), '__fixtures__', 'svg'));

describe('Convert SVG to PNG', function() {
    test('basic math', async function() {
        const svgContent = getSvg('basic_math.svg');
        const buffer = await convertSvgToPng(svgContent, { height: 19.065, width: 59.99953125 });

        await matchSnapshot('basic_math.png', buffer);
    });

    test('prof math', async function() {
        const svgContent = getSvg('prof_math.svg');
        const buffer = await convertSvgToPng(svgContent, { height: 48.069375, width: 716 });

        await matchSnapshot('prof_math.png', buffer);
    });

    test('basic chem', async function() {
        const svgContent = getSvg('basic_chem.svg');
        const buffer = await convertSvgToPng(svgContent, { height: 27, width: 197 });

        await matchSnapshot('basic_chem.png', buffer);
    });
});
