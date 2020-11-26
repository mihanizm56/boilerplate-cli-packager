// eslint-disable-next-line
const colors = require('colors');

const BuildCommand = 'build';
const fullCheckCommand = 'check-full';
const fullCheckSystemWindows = 'check-full-windows';
const fullCheckSystem = 'check-full-system';
const fullLintCheckCommand = 'lint-full';
const deploy = 'deploy';
const checkTypes = 'check-types';

const commandsMap = {
  [checkTypes]: {
    title: 'Проверка типизации',
    value: 'npx tsc',
  },
  [BuildCommand]: {
    title: 'Сборка проекта (Gatsby)',
    value: 'npx gatsby build --prefix-paths',
  },
  [fullLintCheckCommand]: {
    title: 'Запуск Eslint and Stylelint',
    value:
      'npx eslint src/ --ext .ts,.js,.tsx --fix && npx stylelint --fix --max-warnings=0 "src/**/*.{modules.scss,scss,css}"',
  },
  [deploy]: {
    title: 'Запуск деплой команды',
    value: 'bash ./config/deploy/deploy-script.sh',
  },
};

module.exports = {
  fullCheckCommand,
  fullLintCheckCommand,
  commandsMap,
  fullCheckSystem,
  fullCheckSystemWindows,
};
