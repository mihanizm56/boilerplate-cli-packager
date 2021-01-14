const {
  OPEN_TEST_COMMANDS_VALUE,
  CLOSE_TEST_COMMANDS_VALUE,
  COMMIT_COMMAND_VALUE,
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
