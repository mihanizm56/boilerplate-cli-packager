/* eslint-disable no-console */

const { Listr } = require('listr2');
const { exec } = require('../../../../utils/fs-promises');

const runner = async () => {
  const tasksRunner = new Listr(
    [
      {
        title: 'Запуск Eslint and Stylelint',
        task: async () => {
          await exec(
            'node ./cli/_utils/ci-utils/executor.js --command=lint-full',
          );
        },
      },
      {
        title: 'Проверка типизации',
        task: async () => {
          await exec(
            'node ./cli/_utils/ci-utils/executor.js --command=check-types',
          );
        },
      },
      {
        title: 'Сборка приложения',
        task: async () => {
          await exec('node ./cli/_utils/ci-utils/executor.js --command=build');
        },
      },
    ],
    {
      rendererOptions: { collapse: false },
      concurrent: true,
    },
  );

  try {
    await tasksRunner.run();
  } catch (error) {
    console.log(error.stdout || error.message);
    process.exit(1);
  }
};

runner();
