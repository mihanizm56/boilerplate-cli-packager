const { devServerLog } = require('../../_utils/dev-server-logger');

const failedLog =
  '============================= You shall not pass! =============================';

module.exports.processLog = ({ logString, isFromCli, process }) => {
  const isInvalidLog =
    logString.indexOf('Error') !== -1 ||
    logString.indexOf('Error:') !== -1 ||
    logString.indexOf('error ') !== -1 ||
    logString.indexOf('failed') !== -1 ||
    logString.indexOf('Unresolved issues found') !== -1 ||
    logString.indexOf('warning  ') !== -1 ||
    logString.indexOf('Failed to compile') !== -1 ||
    logString.indexOf('✖') !== -1;

  if (isInvalidLog) {
    if (isInvalidLog) {
        devServerLog('info','cli catch Error:', logString.indexOf('Error') !== -1); // eslint-disable-line
        devServerLog('info','cli catch Error', logString.indexOf('Error') !== -1); // eslint-disable-line
        devServerLog('info','cli catch error ', logString.indexOf('error ') !== -1); // eslint-disable-line
        devServerLog('info','position', logString.indexOf('error '));// eslint-disable-line
        devServerLog('info','cli catch failed', logString.indexOf('failed') !== -1);// eslint-disable-line
        devServerLog('info','position', logString.indexOf('failed'));// eslint-disable-line
      devServerLog(
        'info',
        'cli catch Unresolved issues found',
        logString.indexOf('Unresolved issues found') !== -1,
      );
        devServerLog('info','position', logString.indexOf('Unresolved issues found'));// eslint-disable-line
        devServerLog('info','cli catch warning  ', logString.indexOf('warning  ') !== -1);// eslint-disable-line
        devServerLog('info','position', logString.indexOf('warning  '));// eslint-disable-line
      devServerLog(
        'info',
        'cli catch Failed to compile',
        logString.indexOf('Failed to compile') !== -1,
      );
        devServerLog('info','position', logString.indexOf('Failed to compile'));// eslint-disable-line
        devServerLog('info','cli catch ✖', logString.indexOf('✖') !== -1);// eslint-disable-line
        devServerLog('info','position', logString.indexOf('✖'));// eslint-disable-line
    }

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
