const { browserSettings } = require('../get-testcafe-browser-configs');
const { repoName, deployToken, namespace } = require('../_constants');

const buildCommand = 'build';
const testCommand = 'test';
const testCoverateCommand = 'test-coverage';
const fullCheckCommand = 'check-full';
const checkTypes = 'check-types';
const fullLintCheckCommand = 'lint-full';
const fullSystemCheckCommand = 'check-full-system';
const startCommand = 'start';
const integrationTests = 'integration-tests';
const deployToTest = 'deploy-test';
const deployToTestsStands = 'deploy-full-tests';
const deployToAllStands = 'deploy-full';

const commandsMap = {
  [checkTypes]: {
    title: 'Проверка типизации',
    value: 'npx tsc',
  },
  [integrationTests]: {
    title: 'Интеграционнные тесты',
    value: `${browserSettings.chrome} && ${browserSettings.chromeMobile}`,
  },
  [testCommand]: {
    title: 'Запуск тестов',
    value: 'set CI=true && npx jest --config ./config/jest/jest.config.js',
  },
  [buildCommand]: {
    title: 'Сборка create-react-app',
    value:
      'set CI=true && npx cross-env SKIP_PREFLIGHT_CHECK=true PUBLIC_URL=/ react-app-rewired build',
  },
  [testCoverateCommand]: {
    title: 'Покрытие тестами',
    value: 'set CI=true && npx jest --coverage',
  },
  [fullCheckCommand]: {
    title: 'Запуск всех проверок',
    value: `node ./cli/_utils/ci-utils/executor.js --command=${testCommand} && node ./cli/_utils/ci-utils/executor.js --command=${fullLintCheckCommand} && git add .  && node ./cli/_utils/ci-utils/executor.js --command=${buildCommand} && node ./cli/_utils/ci-utils/executor.js --command=${integrationTests}`,
  },
  [fullSystemCheckCommand]: {
    title: 'Запуск всех проверок',
    value: `node ./cli/_utils/ci-utils/executor.js --command=${fullCheckCommand}`,
  },
  [fullLintCheckCommand]: {
    title: 'Запуск Eslint and Stylelint',
    value:
      'npx eslint src/ --ext .ts,.js,.tsx --fix --max-warnings=0 --cache --cache-location .eslintinfo && npx stylelint --fix --max-warnings=0 "src/**/*.{modules.scss,scss,css}" --cache --cache-location .stylelintinfo',
  },
  [startCommand]: {
    title: 'Запуск проекта',
    value:
      'node ./config/env/make-runtime-config.js && npx cross-env NODE_ENV=production node ./server/static.js',
  },
  [deployToTest]: {
    title: 'Запуск деплой команды',
    value: `bash config/deploy/k8s-manifests.sh ${repoName} ${deployToken} ${namespace} test`,
  },
  [deployToTestsStands]: {
    title: 'Запуск деплой команды',
    value: `bash config/deploy/k8s-manifests.sh ${repoName} ${deployToken} ${namespace} test stage`,
  },
  [deployToAllStands]: {
    title: 'Запуск деплой команды',
    value: `bash config/deploy/k8s-manifests.sh ${repoName} ${deployToken} ${namespace} test stage dataline datapro`,
  },
};

module.exports = {
  buildCommand,
  testCommand,
  testCoverateCommand,
  fullCheckCommand,
  fullLintCheckCommand,
  commandsMap,
};
