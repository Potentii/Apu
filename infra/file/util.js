const fs = electronRequire('fs');
const util = electronRequire('util');

export const writeAsync = util.promisify(fs.writeFile);
export const readAsync = util.promisify(fs.readFile);