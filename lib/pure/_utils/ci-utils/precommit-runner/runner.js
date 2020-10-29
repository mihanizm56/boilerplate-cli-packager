/* eslint-disable no-console */

const { Listr } = require('listr2');
const { exec } = require('../../../../utils/fs-promises');
const { NpmPackageVerifyer } = require('../../sdk-api/npm-package-verifyer');

const runner = async () => {
  await NpmPackageVerifyer();

  const tasksRunner = new Listr([
    {
      title: 'Запуск тестов',
      task: async () => {
        await exec('node ./cli/_utils/ci-utils/executor.js --command=test');
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
      title: 'Сборка create-react-app',
      task: async () => {
        await exec(
          'node ./cli/_utils/ci-utils/executor.js --command=cra-build',
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
  ]);

  try {
    await tasksRunner.run();
  } catch (error) {
    console.log(error.stdout || error.message);
    process.exit(1);
  }
};

runner();
