const buildCommand = 'build';
const testCommand = 'test';
const integrationTestsCommand = 'integration-tests';
const testCoverateCommand = 'test-coverage';
const fullCheckCommand = 'check-full';
const fullCheckSystemWindows = 'check-full-windows';
const fullCheckSystem = 'check-full-system';
const fullLintCheckCommand = 'lint-full';
const deploy = 'deploy';
const checkTypes = 'check-types';

const commandsMap = {
  [testCommand]: {
    title: 'Запуск тестов',
    value: 'set CI=true && npx jest --config ./config/jest/jest.config.js',
  },
  [checkTypes]: {
    title: 'Проверка типизации',
    value: 'npx tsc',
  },
  [buildCommand]: {
    title: 'Сборка create-react-app',
    value:
      'set CI=true && npx cross-env NODE_ENV=production PUBLIC_URL=/ npx react-app-rewired build && node ./config/deploy/make-runtime-config.js && node config/deploy/fonts-replace.js',
  },
  [integrationTestsCommand]: {
    title: 'Интеграционнные тесты',
    value:
      'npx cross-env SERVER_PORT=5005 IP_LIMIT=1000 testcafe chrome:headless -c 8 ./integration-tests -a "node config/production-server/static.js"',
  },
  [testCoverateCommand]: {
    title: 'Покрытие тестами',
    value: 'set CI=true && npx jest --coverage',
  },
  [fullCheckCommand]: {
    title: 'Запуск всех проверок',
    value: `node ./cli/_utils/ci-utils/executor.js --command=${testCommand} && node ./cli/_utils/ci-utils/executor.js --command=${fullLintCheckCommand} && git add . && node ./cli/_utils/ci-utils/executor.js --command=${buildCommand}`,
  },
  [fullLintCheckCommand]: {
    title: 'Запуск Eslint and Stylelint',
    value:
      'npx eslint src/ --ext .ts,.js,.tsx --fix && npx stylelint --fix --max-warnings=0 "src/**/*.{modules.scss,scss,css}"',
  },
  [deploy]: {
    title: 'Запуск деплой команды',
    value: 'bash config/deploy/deploy-script.sh',
  },
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
