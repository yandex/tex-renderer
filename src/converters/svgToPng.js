const sharp = require('sharp');
const PNG_SCALE = 2;

async function convertSvgToPng(svg, { height, width, textColor = 'black' }) {
    const svgContent = svg.replace(/="currentColor"/g, `="${textColor}"`);

    return sharp(Buffer.from(svgContent), { density: 90 })
        .resize(Math.floor(width * PNG_SCALE), Math.floor(height * PNG_SCALE))
        .png()
        .toBuffer();
}

module.exports = {
    convertSvgToPng,
};
