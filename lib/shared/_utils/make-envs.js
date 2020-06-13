const fs = require('fs');
const path = require('path');

const pathToWriteFile = path.join(__dirname, '..', '..', '..', '.env');

module.exports.makeEnvs = envsList => {
  const parsedEnvs = envsList.reduce((acc, { label, value }) => {
    acc += `${label}=${value}\n`; // eslint-disable-line

    return acc;
  }, '');

  fs.writeFileSync(pathToWriteFile, parsedEnvs, 'utf8');
};
