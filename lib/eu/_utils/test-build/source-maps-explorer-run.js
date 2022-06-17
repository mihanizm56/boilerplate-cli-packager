const { spawn } = require('child_process');

module.exports.sourceMapExplorerRun = () =>
  spawn('source-map-explorer  build/umd/*.js --gzip', {
    shell: true,
    stdio: 'inherit',
  });
