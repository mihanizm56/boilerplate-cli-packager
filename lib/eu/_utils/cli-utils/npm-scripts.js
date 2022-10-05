const {
  OPEN_TEST_COMMANDS_VALUE,
  CLOSE_TEST_COMMANDS_VALUE,
  OPEN_ADDITIONAL_COMMANDS_VALUE,
  CLOSE_ADDITIONAL_COMMANDS_VALUE,
  COMMIT_COMMAND_VALUE,
  OPEN_EXTRA_COMMANDS_VALUE,
  CLOSE_EXTRA_COMMANDS_VALUE,
  COMMIT_COMMAND_LABEL,
  DOCKER_BUILD_COMMAND_LABEL,
  dockerPort,
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
    label: 'Запуск сборки приложения (CRA)',
    value: 'cross-env CI=false react-app-rewired build',
    type: 'npx',
    isDetached: false,
    isCiScript: false,
    isInteractiveScript: true,
  },
  {
    label: 'Запуск сборки приложения (Platform)',
    value: 'module-build',
    type: 'ci',
    isDetached: false,
    isCiScript: true,
  },
  {
    label: 'Проверка наличия обновлений @wildberries/portal-routes',
    value: 'cli/_utils/portal-routes-check/npm-package-updater.js',
    type: 'node',
    isDetached: true,
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
    label: 'Запуск тестов',
    value: 'test',
    type: 'ci',
    isDetached: false,
    isCiScript: true,
  },
  {
    label: 'Запуск тестов с обновлением snapshots',
    value: 'jest --config ./config/jest/jest.config.js -u',
    type: 'npx',
    isDetached: false,
    isCiScript: false,
    isInteractiveScript: true,
  },
  {
    label: 'Проверка типов',
    value: 'check-types',
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
    label: 'Запуск сборки с sourcemaps',
    value: 'cli/_utils/test-build/run-build.js',
    type: 'node',
    isDetached: true,
    isCiScript: false,
    isInteractiveScript: true,
  },
];

module.exports.additionalCommands = [
  {
    label: 'Назад',
    value: CLOSE_ADDITIONAL_COMMANDS_VALUE,
  },
  {
    label: 'Запуск приложения в режиме интеграции c платформой',
    value:
      '-fr node_modules/.cache && cross-env WATCH_PLATFORM=true NODE_ENV=development npx webpack --config config/webpack/platform/development/webpack-dev.config.js --watch',
    type: 'rm',
    isDetached: false,
    isCiScript: false,
    isInteractiveScript: true,
  },
  {
    label: 'Запуск мок-сервера',
    value: './server/app.js',
    type: 'node',
    isDetached: false,
    isCiScript: false,
    isInteractiveScript: true,
  },
  {
    label: 'Обновление до последней конфигурации',
    value: 'cli/_utils/update-to-mod.js',
    type: 'node',
    isDetached: true,
    isCiScript: false,
    isInteractiveScript: true,
  },
  {
    label:
      'Запуск приложения в тестовом режиме с мок-сервером (linux and macOs only)',
    value:
      'concurrently --kill-others-on-fail "npx react-app-rewired start" "node ./server/app.js"',
    type: 'npx',
    isDetached: false,
    isCiScript: false,
    isInteractiveScript: true,
  },
  {
    label: 'Сброс кэша сборок',
    value: '-rf node_modules/.cache',
    type: 'rm',
    isDetached: false,
    isCiScript: false,
    isInteractiveScript: true,
  },
];

module.exports.extraCommands = [
  {
    label: 'Назад',
    value: CLOSE_EXTRA_COMMANDS_VALUE,
  },
  {
    label: DOCKER_BUILD_COMMAND_LABEL,
    value: `build -t test -f ./config/deploy/Dockerfile ./ && docker run -it -p ${dockerPort}:443 test`,
    type: 'docker',
    isDetached: false,
    isCiScript: false,
    isInteractiveScript: true,
  },
  {
    label: 'Деплой проекта',
    value: '@mihanizm56/deploy-tag',
    type: 'npx',
    isDetached: false,
    isCiScript: false,
    isInteractiveScript: true,
  },
];
