require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { devServerLog } = require('../../_utils/dev-server-logger');
const frontendEnvs = require('../../frontend-envs');

const pathToWriteFile = path.join(
  __dirname,
  '..',
  '..',
  'build',
  'runtime-config.js',
);

const DEFAULT_VARS = [];

const getJSEnvsInWindow = () =>
  Object.keys(process.env)
    .reduce(
      (acc, envName) => {
        if (frontendEnvs[envName]) {
          acc.push(
            `window.${envName} = ${JSON.stringify(process.env[envName])}`,
          );
        }

        return acc;
      },
      [...DEFAULT_VARS],
    )
    .join(';');

try {
  fs.writeFileSync(pathToWriteFile, getJSEnvsInWindow(), 'utf8');
} catch (err) {
  devServerLog('error', 'Error while writing client-env file:', err.message);
  process.exit(1);
}
