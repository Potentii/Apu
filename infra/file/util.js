const fs = nodeRequire('fs');
const util = nodeRequire('util');

export const writeAsync = util.promisify(fs.writeFile);
export const readAsync = util.promisify(fs.readFile);