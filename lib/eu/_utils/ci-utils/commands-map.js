// eslint-disable-next-line
const colors = require('colors');
const { browserSettings } = require('../get-testcafe-browser-configs');

const moduleBuildCommand = 'module-build';
const CRABuildCommand = 'cra-build';
const FullBuildCommand = 'build';
const testCommand = 'test';
const testCoverateCommand = 'test-coverage';
const fullCheckCommand = 'check-full';
const fullCheckSystemWindows = 'check-full-windows';
const fullCheckSystem = 'check-full-system';
const fullLintCheckCommand = 'lint-full';
const deploy = 'deploy';
const integrationTests = 'integration-tests';
const checkTypes = 'check-types';

const commandsMap = {
  [integrationTests]: `${browserSettings.chrome} && ${browserSettings.chromeMobile}`,
  [checkTypes]: 'npx tsc',
  [testCommand]:
    'set CI=true && npx jest --config ./config/jest/jest.config.js',
  [CRABuildCommand]: 'set CI=true && npx react-app-rewired build',
  [FullBuildCommand]: `node ./cli/_utils/ci-utils/executor.js --command=${CRABuildCommand} && node ./cli/_utils/ci-utils/executor.js --command=${moduleBuildCommand}`,
  [moduleBuildCommand]:
    'set CI=true && rm -fr ./build && npx webpack --display errors-only --config ./config/webpack/platform/production/webpack.config.js',
  [testCoverateCommand]:
    'set CI=true && npx jest --config ./config/jest/jest.config.js --coverage',
  [fullCheckCommand]: `node ./cli/_utils/ci-utils/executor.js --command=${testCommand} && node ./cli/_utils/ci-utils/executor.js --command=${fullLintCheckCommand} && git add . && node ./cli/_utils/ci-utils/executor.js --command=${checkTypes} && node ./cli/_utils/ci-utils/executor.js --command=${CRABuildCommand} && node ./cli/_utils/ci-utils/executor.js --command=${moduleBuildCommand}`,
  [fullLintCheckCommand]:
    'npx eslint src/ --ext .ts,.js,.tsx --fix && npx stylelint --fix --max-warnings=0 "src/**/*.{modules.scss,scss,css}"',
  [deploy]: 'bash ./config/deploy/deploy-script.sh',
};

module.exports = {
  moduleBuildCommand,
  testCommand,
  testCoverateCommand,
  fullCheckCommand,
  fullLintCheckCommand,
  commandsMap,
  fullCheckSystem,
  fullCheckSystemWindows,
};
