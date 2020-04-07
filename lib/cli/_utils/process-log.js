const { devServerLog } = require('../../utils/dev-server-logger');

const failedLog =
  '============================= You shall not pass! =============================';

module.exports.processLog = ({ logString, isFromCli, process }) => {
  const isInvalidLog =
    logString.indexOf('error') !== -1 ||
    logString.indexOf('failed') !== -1 ||
    logString.indexOf('Unresolved issues found') !== -1 ||
    logString.indexOf('warning  ') !== -1 ||
    logString.indexOf('Failed to compile') !== -1 ||
    logString.indexOf('✖') !== -1;

  if (isInvalidLog) {
    devServerLog(
      'info',
      '#############################log is invalid#############################',
    );
    devServerLog('info', logString);

    if (Boolean(isFromCli)) {
      devServerLog('info', failedLog);
      process.exit();
    }

    throw new Error(failedLog);
  }
};
