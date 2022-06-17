// eslint-disable-next-line import/no-extraneous-dependencies
const { Listr } = require('listr2');
const { processSourceMapsPackage } = require('./source-maps-check');
const { sourceMapExplorerRun } = require('./source-maps-explorer-run');
const { buildWebpack } = require('./webpack-build');

const runBuild = async () => {
  const tasks = new Listr([
    {
      title: 'Prepare',
      task: async (ctx, task) =>
        task.newListr(
          [
            {
              title: 'Search for global package (source-map-explorer)',
              task: async () => {
                await processSourceMapsPackage();
              },
            },
            {
              title: 'Webpack build with sourcemaps',
              task: async () => {
                await buildWebpack();
              },
            },
          ],
          {
            concurrent: true,
          },
        ),
    },
    {
      title: 'Explore source maps with gzip compression build',
      task: sourceMapExplorerRun,
    },
  ]);

  await tasks.run();
};

runBuild();
