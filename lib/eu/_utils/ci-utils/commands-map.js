const { browserSettings } = require('../get-testcafe-browser-configs');
const { repoName, deployToken, projectName } = require('../_constants');

const moduleBuildCommand = 'module-build';
const CRABuildCommand = 'cra-build';
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
const integrationTests = 'integration-tests';

const commandsMap = {
  [integrationTests]: `${browserSettings.chrome} && ${browserSettings.chromeMobile}`,
  [testCommand]:
    'set CI=true && npx jest --config ./config/jest/jest.config.js',
  [CRABuildCommand]: 'set CI=true && npx react-app-rewired build',
  [moduleBuildCommand]:
    'set CI=true && rm -fr ./build && npx webpack --display errors-only --config ./config/webpack/webpack.config.js',
  [testCoverateCommand]:
    'set CI=true && npx jest --config ./config/jest/jest.config.js --coverage',
  [fullCheckCommand]: `node ./cli/_utils/ci-utils/executor.js --command=${testCommand} && node ./cli/_utils/ci-utils/executor.js --command=${fullLintCheckCommand} && git add . && node ./cli/_utils/ci-utils/executor.js --command=${CRABuildCommand} && node ./cli/_utils/ci-utils/executor.js --command=${moduleBuildCommand}`,
  [fullCheckSystemWindows]: `node ./cli/_utils/ci-utils/executor.js --command=${testCommand} && node ./cli/_utils/ci-utils/executor.js --command=${fullLintCheckCommand} && node ./cli/_utils/ci-utils/executor.js --command=${CRABuildCommand} && node ./cli/_utils/ci-utils/executor.js --command=${moduleBuildCommand}`,
  [fullLintCheckCommand]:
    'npx eslint -c config/linters/.eslintrc.js src/ --ext .ts,.js,.tsx --fix && npx stylelint --fix --max-warnings=0 "src/**/*.{modules.scss,scss,css}" --config config/linters/.stylelintrc.js',
  [deployToTest]: `bash ./config/deploy/template_ci.sh ${repoName} ${deployToken} ${projectName} test`,
  [deployToStage]: `bash ./config/deploy/template_ci.sh ${repoName} ${deployToken} ${projectName} stage`,
  [deployToTestsStands]: `bash ./config/deploy/template_ci.sh ${repoName} ${deployToken} ${projectName} test stage`,
  [deployToAllStands]: `bash ./config/deploy/template_ci.sh test ${repoName} ${deployToken} ${projectName} stage dataline datapro`,
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
