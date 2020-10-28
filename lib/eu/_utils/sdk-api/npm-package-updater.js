/* eslint-disable no-console */
// eslint-disable-next-line
const colors = require('colors');
const dotenv = require('dotenv');
const { Listr } = require('listr2');
const { exec } = require('../../../utils/fs-promises');

dotenv.config();

const {
  getOutdatedPackageLog,
  getActualSuccessPackageLog,
} = require('./loggers');
const checkNpmPackageVersions = require('./check-npm-package-versions');

const makeUpdateCLIRunner = async updateCommands => {
  const tasks = new Listr([
    {
      task: async (ctx, task) => {
        ctx.input = await task.prompt({
          type: 'Toggle',
          message: 'Обновить пакеты sdk-api ?',
        });

        if (!ctx.input) {
          process.exit(1);
        }
      },
    },
    {
      title: 'Update sdk-api packages',
      task: async () => {
        await Promise.all(
          updateCommands.map(async command => {
            await exec(command);
          }),
        );

        await exec('npx npm-force-resolutions && npm i');
      },
    },
  ]);

  await tasks.run();
};

const executor = async () => {
  try {
    // eslint-disable-next-line
    const { packages } = require('../../../config/sdk-api/index.json');

    const updateCommands = await Promise.all(
      packages.map(async packageName => {
        const {
          currentVersion,
          latestVersion,
          isActual,
        } = await checkNpmPackageVersions(packageName);

        if (isActual) {
          getActualSuccessPackageLog({
            version: currentVersion,
            packageName,
          });

          return;
        }

        getOutdatedPackageLog({
          packageName,
          currentVersion,
          latestVersion,
        });

        return `npm install ${packageName}@${latestVersion}`;
      }),
    );

    const filteredCommands = updateCommands.filter(Boolean);

    if (filteredCommands.length) {
      await makeUpdateCLIRunner(updateCommands);
    }
  } catch (error) {
    if (error.code !== 'MODULE_NOT_FOUND') {
      console.log(`${error}`.red);
    }

    console.log('Пакеты sdk-api не выбраны'.yellow);
    console.log(
      'Для выбора - выполните команду '.yellow +
        'npm run setup'.yellow.underline +
        ' и введите пакеты sdk-api'.yellow,
    );
  }
};

executor();
