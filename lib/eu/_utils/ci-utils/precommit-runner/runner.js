/* eslint-disable no-console */

const { Listr } = require('listr2');
const { exec } = require('../../../../utils/fs-promises');
// const { NpmPackageVerifyer } = require('../../sdk-api/npm-package-verifyer');
const {
  NpmPackageVerifyer: RoutesNpmPackageVerifyer,
} = require('../../portal-routes-check/npm-package-verifyer');

const runner = async () => {
  // await NpmPackageVerifyer();
  await RoutesNpmPackageVerifyer();

  console.log('');

  const tasksRunner = new Listr(
    [
      {
        title: 'Тестирование проекта',
        task: async (ctx, task) =>
          task.newListr(
            [
              {
                title: 'Запуск тестов',
                task: async () => {
                  await exec(
                    'node ./cli/_utils/ci-utils/executor.js --command=test',
                  );
                },
              },
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
                title: 'Сборка platform-module',
                task: async () => {
                  await exec(
                    'node ./cli/_utils/ci-utils/executor.js --command=module-build',
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
