const {
  OPEN_TEST_COMMANDS_VALUE,
  CLOSE_TEST_COMMANDS_VALUE,
  COMMIT_COMMAND_VALUE,
  OPEN_ADDITIONAL_COMMANDS_VALUE,
  CLOSE_ADDITIONAL_COMMANDS_VALUE,
} = require('./_constants');

module.exports.mainCommands = [
  {
    label: 'Запуск клиентской части приложения',
    value: 'ssr-scripts start',
    type: 'npx',
    isCiScript: false,
    isInteractiveScript: true,
  },
  {
    label: 'Добавить все изменения и сделать коммит',
    value: COMMIT_COMMAND_VALUE,
    type: 'git',
    isInteractiveScript: true,
    isCiScript: false,
  },
  {
    label: 'Запуск сборки приложения',
    value: 'ssr-scripts build',
    type: 'npx',
    isCiScript: false,
    isInteractiveScript: true,
  },
  {
    label: 'Запуск сторибука',
    value: 'start-storybook -p 6006 -c .storybook watch-css -s ./public',
    type: 'npx',
    isInteractiveScript: true,
    isCiScript: false,
  },
  {
    label: 'Запуск мок-сервера',
    value: 'server/app.js',
    type: 'node',
    isInteractiveScript: true,
    isCiScript: false,
  },
  {
    label: 'Запуск приложения с мок-сервером',
    value:
      'concurrently --kill-others-on-fail "npx ssr-scripts start" "npx nodemon server/app.js"',
    type: 'npx',
    isInteractiveScript: true,
    isCiScript: false,
  },
  {
    label: 'Открыть список тестовых команд',
    value: OPEN_TEST_COMMANDS_VALUE,
  },
  {
    label: 'Открыть список дополнительных команд',
    value: OPEN_ADDITIONAL_COMMANDS_VALUE,
  },
];

module.exports.testCommands = [
  {
    label: 'Назад',
    value: CLOSE_TEST_COMMANDS_VALUE,
  },
  {
    label: 'Запуск проверки eslint и stylelint',
    value: 'lint-full',
    type: 'ci',
    isIOInherit: false,
    withLoader: true,
    isCiScript: true,
  },
];

module.exports.additionalCommands = [
  {
    label: 'Назад',
    value: CLOSE_ADDITIONAL_COMMANDS_VALUE,
  },
  {
    label: 'Сборка приложения с анализом зависимостей',
    value: 'ssr-scripts build:analyse',
    type: 'npx',
    isInteractiveScript: true,
    isCiScript: false,
  },
  {
    label: 'Очистка кэша сборки приложения',
    value: ' -fr node_modules/@mihanizm56/ssr-scripts/node_modules/.cache',
    type: 'rm',
    isInteractiveScript: true,
    isCiScript: false,
  },
];
