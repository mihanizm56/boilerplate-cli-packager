const {
  OPEN_TEST_COMMANDS_VALUE,
  CLOSE_TEST_COMMANDS_VALUE,
  OPEN_ADDITIONAL_COMMANDS_VALUE,
  CLOSE_ADDITIONAL_COMMANDS_VALUE,
  COMMIT_COMMAND_VALUE,
  OPEN_EXTRA_COMMANDS_VALUE,
  COMMIT_COMMAND_LABEL,
  DOCKER_BUILD_COMMAND_LABEL,
  NPM_VULNERABILITIES_COMMAND_LABEL,
  NPM_VULNERABILITIES_COMMAND_VALUE,
} = require('./_constants');

module.exports.mainCommands = [
  {
    label: 'Запуск клиентской части приложения',
    value: 'react-app-rewired start',
    type: 'npx',
    isDetached: false,
    isCiScript: false,
    isInteractiveScript: true,
  },
  {
    label: COMMIT_COMMAND_LABEL,
    value: COMMIT_COMMAND_VALUE,
    type: 'git',
    isDetached: false,
    isCiScript: false,
    isInteractiveScript: true,
  },
  {
    label: 'Запуск всех прекоммит-проверок',
    value: 'check-full',
    type: 'ci',
    isDetached: false,
    isCiScript: true,
  },
  {
    label: 'Запуск сервера статики в продакшен режиме',
    value: 'config/production-server/static.js',
    type: 'node',
    isDetached: false,
    isCiScript: false,
    isInteractiveScript: true,
  },
  {
    label: 'Запуск сборки приложения',
    value: 'react-app-rewired build',
    type: 'npx',
    isDetached: false,
    isCiScript: false,
    isInteractiveScript: true,
  },
  {
    label: 'Открыть список тестовых команд',
    value: OPEN_TEST_COMMANDS_VALUE,
  },
  {
    label: 'Открыть список дополнительных команд',
    value: OPEN_ADDITIONAL_COMMANDS_VALUE,
  },
  {
    label: 'Открыть список деплой команд',
    value: OPEN_EXTRA_COMMANDS_VALUE,
  },
];

module.exports.testCommands = [
  {
    label: 'Назад',
    value: CLOSE_TEST_COMMANDS_VALUE,
  },
  {
    label: NPM_VULNERABILITIES_COMMAND_LABEL,
    value: NPM_VULNERABILITIES_COMMAND_VALUE,
    type: 'npx',
    isDetached: false,
    isCiScript: false,
    isInteractiveScript: true,
  },
  {
    label: 'Запуск тестов',
    value: 'test',
    type: 'ci',
    isDetached: false,
    isCiScript: true,
  },
  {
    label: 'Запуск проверки eslint и stylelint',
    value: 'lint-full',
    type: 'ci',
    isDetached: false,
    isCiScript: true,
  },
  {
    label: 'Запуск integration тестов в ручном режиме',
    value:
      'react-app-rewired build && node config/deploy/make-runtime-config.js && npx cross-env SERVER_PORT=5005 IP_LIMIT=1000 testcafe chrome:headless ./integration-tests -a "node config/production-server/static.js"',
    type: 'npx',
    isDetached: false,
    isCiScript: false,
  },
  {
    label: 'Запуск integration тестов в ci режиме',
    value:
      'react-app-rewired build && node config/deploy/make-runtime-config.js && npx cross-env SERVER_PORT=5005 IP_LIMIT=1000 testcafe chrome:headless ./integration-tests -a "node config/production-server/static.js"',
    type: 'npx',
    isDetached: false,
    isCiScript: true,
  },
];

module.exports.additionalCommands = [
  {
    label: 'Назад',
    value: CLOSE_ADDITIONAL_COMMANDS_VALUE,
  },
  {
    label: 'Запуск изменения package-lock.json в соответствии с "resolutions"',
    value: 'npm-force-resolutions && npm i',
    type: 'npx',
    isDetached: false,
    isCiScript: false,
  },
  {
    label: 'Запуск мок-сервера',
    value: './server/app.js',
    type: 'node',
    isDetached: false,
    isCiScript: false,
  },
  {
    label:
      'Запуск приложения в тестовом режиме с мок-сервером (linux and macOs only)',
    value:
      'concurrently --kill-others-on-fail "npx react-app-rewired start" "node ./server/app.js"',
    type: 'npx',
    isDetached: false,
    isCiScript: false,
  },
  {
    label: 'Обновление до конфигурации нового каркаса',
    value: 'cli/_utils/update-to-mod.js --mod="euro"',
    type: 'node',
    isDetached: true,
    isCiScript: false,
    isInteractiveScript: true,
  },
  {
    label: 'Обновление до конфигурации текущего каркаса',
    value: 'cli/_utils/update-to-mod.js --mod="ru"',
    type: 'node',
    isDetached: true,
    isCiScript: false,
    isInteractiveScript: true,
  },
  {
    label: 'Запуск отображения покрытия тестами',
    value: 'jest --config ./config/jest/jest.config.js --coverage',
    type: 'npx',
    isDetached: false,
    isCiScript: false,
  },
];

module.exports.extraCommands = [
  {
    label: 'Назад',
    value: CLOSE_ADDITIONAL_COMMANDS_VALUE,
  },
  {
    label: DOCKER_BUILD_COMMAND_LABEL,
    value:
      'build -t test -f ./config/deploy/Dockerfile ./ && docker run -it -p 8080:80 test',
    type: 'docker',
    isDetached: false,
    isCiScript: false,
    isInteractiveScript: true,
  },
  {
    label: 'Деплой проекта',
    value: 'deploy',
    type: 'ci',
    isDetached: false,
    isCiScript: true,
  },
];
