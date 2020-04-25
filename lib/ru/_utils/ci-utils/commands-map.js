const buildCommand = 'build';
const testCommand = 'test';
const integrationTestsCommand = 'integration-tests';
const testCoverateCommand = 'test-coverage';
const fullCheckCommand = 'check-full';
const fullCheckSystemWindows = 'check-full-windows';
const fullCheckSystem = 'check-full-system';
const fullLintCheckCommand = 'lint-full';

const commandsMap = {
  [testCommand]:
    'set CI=true && npx jest --config ./config/jest/jest.config.js',
  [buildCommand]:
    'set CI=true && npx cross-env NODE_ENV=production PUBLIC_URL=/ npx react-app-rewired build',
  [integrationTestsCommand]:
    'npx cross-env SERVER_PORT=5005 IP_LIMIT=1000 testcafe chrome:headless ./integration-tests -a "node config/production-server/static.js"',
  [testCoverateCommand]: 'set CI=true && npx jest --coverage',
  [fullCheckCommand]: `node ./cli/_utils/ci-utils/executor.js --command=${testCommand} && node ./cli/_utils/ci-utils/executor.js --command=${fullLintCheckCommand} && git add . && node ./cli/_utils/ci-utils/executor.js --command=${buildCommand} && node ./cli/_utils/ci-utils/executor.js --command=${integrationTestsCommand}`,
  [fullCheckSystemWindows]: `node ./cli/_utils/ci-utils/executor.js --command=${testCommand} && node ./cli/_utils/ci-utils/executor.js --command=${fullLintCheckCommand} && node ./cli/_utils/ci-utils/executor.js --command=${buildCommand} && node ./cli/_utils/ci-utils/executor.js --command=${integrationTestsCommand}`,
  [fullLintCheckCommand]:
    'npx eslint -c config/linters/.eslintrc.js src/ --ext .ts,.js,.tsx --fix && npx stylelint --fix --max-warnings=0 "src/**/*.{modules.scss,scss,css}" --config config/linters/.stylelintrc.js',
};

module.exports = {
  buildCommand,
  testCommand,
  integrationTestsCommand,
  testCoverateCommand,
  fullCheckCommand,
  fullLintCheckCommand,
  commandsMap,
  fullCheckSystem,
  fullCheckSystemWindows,
};
