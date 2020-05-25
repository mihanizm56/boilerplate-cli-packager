const { repoName, deployToken, projectName } = require('../_constants');

const buildCommand = 'build';
const testCommand = 'test';
const testCoverateCommand = 'test-coverage';
const fullCheckCommand = 'check-full';
const fullCheckSystemWindows = 'check-full-windows';
const fullCheckSystem = 'check-full-system';
const fullLintCheckCommand = 'lint-full';
const deployToTest = 'deploy-test';
const deployToStage = 'deploy-stage';
const deployToTestsStands = 'deploy-full-tests';
const deployToAllStands = 'deploy-full';
const compressBuild = 'compress-build';

const commandsMap = {
  [testCommand]:
    'set CI=true && npx jest --config ./config/jest/jest.config.js',
  [compressBuild]: 'npx @mihanizm56/compression \'["build/umd"]\'',
  [buildCommand]:
    'set CI=true && rm -fr ./build && npx webpack --display errors-only --config ./config/webpack/webpack.config.js',
  [testCoverateCommand]:
    'set CI=true && npx jest --config ./config/jest/jest.config.js --coverage',
  [fullCheckCommand]: `node ./cli/_utils/ci-utils/executor.js --command=${testCommand} && node ./cli/_utils/ci-utils/executor.js --command=${fullLintCheckCommand} && git add . && node ./cli/_utils/ci-utils/executor.js --command=${buildCommand}`,
  [fullCheckSystemWindows]: `node ./cli/_utils/ci-utils/executor.js --command=${testCommand} && node ./cli/_utils/ci-utils/executor.js --command=${fullLintCheckCommand} && node ./cli/_utils/ci-utils/executor.js --command=${buildCommand}`,
  [fullLintCheckCommand]:
    'npx eslint -c config/linters/.eslintrc.js src/ --ext .ts,.js,.tsx --fix && npx stylelint --fix --max-warnings=0 "src/**/*.{modules.scss,scss,css}" --config config/linters/.stylelintrc.js',
  [deployToTest]: `node ./cli/_utils/ci-utils/executor.js --command=${fullCheckSystem} && bash ./config/deploy/template_ci.sh ${repoName} ${deployToken} ${projectName} test`,
  [deployToStage]: `node ./cli/_utils/ci-utils/executor.js --command=${fullCheckSystem} && bash ./config/deploy/template_ci.sh ${repoName} ${deployToken} ${projectName} stage`,
  [deployToTestsStands]: `node ./cli/_utils/ci-utils/executor.js --command=${fullCheckSystem} && bash ./config/deploy/template_ci.sh ${repoName} ${deployToken} ${projectName} test stage`,
  [deployToAllStands]: `node ./cli/_utils/ci-utils/executor.js --command=${fullCheckSystem} && bash ./config/deploy/template_ci.sh test ${repoName} ${deployToken} ${projectName} stage dataline datapro`,
};

module.exports = {
  buildCommand,
  testCommand,
  testCoverateCommand,
  fullCheckCommand,
  fullLintCheckCommand,
  commandsMap,
  fullCheckSystem,
  fullCheckSystemWindows,
};
