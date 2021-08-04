const buildCommand = 'build';
const fullLintCheckCommand = 'lint-full';
const checkTypes = 'check-types';

const commandsMap = {
  [checkTypes]: {
    title: 'Проверка типизации',
    value: 'npx tsc',
  },
  [buildCommand]: {
    title: 'Сборка приложения',
    value: 'npx ssr-scripts build',
  },
  [fullLintCheckCommand]: {
    title: 'Запуск Eslint and Stylelint',
    value:
      'npx eslint src/ --ext .ts,.js,.tsx --fix --max-warnings=0 --cache --cache-location .eslintinfo && npx stylelint --fix --max-warnings=0 "src/**/*.{modules.scss,scss,css}" --cache --cache-location .stylelintinfo',
  },
};

module.exports = {
  buildCommand,
  fullLintCheckCommand,
  commandsMap,
};
