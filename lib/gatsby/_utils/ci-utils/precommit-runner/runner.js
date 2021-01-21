/* eslint-disable no-console */

const { spawnSync } = require('child_process');
const { Listr } = require('listr2');
const { exec } = require('../../../../utils/fs-promises');
const { NpmPackageVerifyer } = require('../../sdk-api/npm-package-verifyer');

const runner = async () => {
  await NpmPackageVerifyer();

  const tasksRunner = new Listr(
    [
      {
        title: 'Скачивание и обновление переводов',
        task: () => spawnSync('node', ['utils/dictionary-generator/index.js']),
      },
      {
        title: 'Тестирование проекта',
        task: async (ctx, task) =>
          task.newListr(
            [
              {
                title: 'Запуск Eslint and Stylelint',
                task: async () => {
                  await exec(
                    'node ./cli/_utils/ci-utils/executor.js --command=lint-full && git add .',
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
                title: 'Сборка gatsby',
                task: async () => {
                  await exec(
                    'node ./cli/_utils/ci-utils/executor.js --command=build',
                  );
                },
              },
            ],
            {
              concurrent: true,
            },
          ),
      },
    ],
    { rendererOptions: { collapse: false } },
  );

  try {
    await tasksRunner.run();
  } catch (error) {
    console.log(error.stdout || error.message);
    process.exit(1);
  }
};

runner();
