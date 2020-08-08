const path = require('path');
const assert = require('assert');
const util = require('util');
const fse = require('fs-extra');
const looksSame = require('looks-same');

const looksSamePromise = util.promisify(looksSame);

const getFixture = dirPath => filename => fse.readFileSync(path.join(dirPath, filename), 'utf8');

const ensureFile = (filePath, content, encoding) => {
    const fileExist = fse.pathExistsSync(filePath);
    if (!fileExist) {
        fse.outputFileSync(filePath, content, encoding);
        console.info('dump file:', filePath, encoding);
        return content;
    }

    return fse.readFileSync(filePath, encoding);
};

const matchBinary = dirPath => async(filename, content) => {
    const filePath = path.join(dirPath, filename);
    const fileContent = ensureFile(filePath, content);
    const { equal: imagesIsEquals } = await looksSamePromise(content, fileContent);
    assert.ok(imagesIsEquals);
};

const matchContent = dirPath => (filename, content) => {
    const filePath = path.join(dirPath, filename);
    const fileContent = ensureFile(filePath, content, 'utf8');
    assert.equal(fileContent, content);
};

module.exports = {
    getFixture,
    matchBinary,
    matchContent,
};
