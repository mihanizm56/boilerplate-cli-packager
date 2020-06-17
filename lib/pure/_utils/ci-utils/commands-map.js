const { browserSettings } = require('../get-testcafe-browser-configs');
const { repoName, deployToken, namespace } = require('../_constants');

const buildCommand = 'build';
const testCommand = 'test';
const testCoverateCommand = 'test-coverage';
const fullCheckCommand = 'check-full';
const fullLintCheckCommand = 'lint-full';
const fullSystemCheckCommand = 'check-full-system';
const startCommand = 'start';
const compressBuild = 'compress-build';
const integrationTests = 'integration-tests';
const deployToTest = 'deploy-test';
const deployToTestsStands = 'deploy-full-tests';
const deployToAllStands = 'deploy-full';

const commandsMap = {
  [integrationTests]: `${browserSettings.chrome} && ${browserSettings.chromeMobile}`,
  [testCommand]:
    'set CI=true && npx jest --config ./config/jest/jest.config.js',
  [compressBuild]:
    'npx @mihanizm56/compression --gzip --dir=\'["build","build/static/js", "build/static/css", "build/_assets"]\' --brotli',
  [buildCommand]:
    'set CI=true && npx cross-env PUBLIC_URL=/ npx react-app-rewired build',
  [testCoverateCommand]: 'set CI=true && npx jest --coverage',
  [fullCheckCommand]: `node ./cli/_utils/ci-utils/executor.js --command=${testCommand} && node ./cli/_utils/ci-utils/executor.js --command=${fullLintCheckCommand} && git add .  && node ./cli/_utils/ci-utils/executor.js --command=${buildCommand} && node ./cli/_utils/ci-utils/executor.js --command=${integrationTests}`,
  [fullSystemCheckCommand]: `node ./cli/_utils/ci-utils/executor.js --command=${fullCheckCommand}`,
  [fullLintCheckCommand]:
    'npx eslint -c config/linters/.eslintrc.js src/ --ext .ts,.js,.tsx --fix && npx stylelint --fix --max-warnings=0 "src/**/*.{modules.scss,scss,css}" --config config/linters/.stylelintrc.js',
  [startCommand]:
    'node ./config/env/make-runtime-config.js && npx cross-env NODE_ENV=production node ./server/static.js',
  [deployToTest]: `bash config/deploy/k8s-manifests.sh ${repoName} ${deployToken} ${namespace} test`,
  [deployToTestsStands]: `bash config/deploy/k8s-manifests.sh ${repoName} ${deployToken} ${namespace} test stage`,
  [deployToAllStands]: `bash config/deploy/k8s-manifests.sh ${repoName} ${deployToken} ${namespace} test stage dataline datapro`,
};

module.exports = {
  buildCommand,
  testCommand,
  testCoverateCommand,
  fullCheckCommand,
  fullLintCheckCommand,
  commandsMap,
};
