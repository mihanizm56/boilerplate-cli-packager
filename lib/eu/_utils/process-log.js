/* eslint-disable no-console */
// eslint-disable-next-line
const colors = require('colors');
const { devServerLog } = require('../../utils/dev-server-logger');

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
    console.log('Catched the error:'.red.underline);
    console.log(logString);
    console.log('Error Information:'.red.underline);
    devServerLog('info', 'cli catch Error:', logString.indexOf('Error') !== -1);
    devServerLog('info', 'cli catch Error', logString.indexOf('Error') !== -1);
    devServerLog(
      'info',
      'cli catch error ',
      logString.indexOf('error ') !== -1,
    );
    devServerLog('info', 'position', logString.indexOf('error '));
    devServerLog(
      'info',
      'cli catch failed',
      logString.indexOf('failed') !== -1,
    );
    devServerLog('info', 'position', logString.indexOf('failed'));
    devServerLog(
      'info',
      'cli catch Unresolved issues found',
      logString.indexOf('Unresolved issues found') !== -1,
    );
    devServerLog(
      'info',
      'position',
      logString.indexOf('Unresolved issues found'),
    );
    devServerLog(
      'info',
      'cli catch warning  ',
      logString.indexOf('warning  ') !== -1,
    );
    devServerLog('info', 'position', logString.indexOf('warning  '));
    devServerLog(
      'info',
      'cli catch Failed to compile',
      logString.indexOf('Failed to compile') !== -1,
    );
    devServerLog('info', 'position', logString.indexOf('Failed to compile'));
    devServerLog('info', 'cli catch ✖', logString.indexOf('✖') !== -1);
    devServerLog('info', 'position', logString.indexOf('✖'));
    console.log('');
    console.log('');
    console.log('Please, scroll up to see the full log'.red.underline);
    console.log('You shall not pass!'.red.underline);

    if (Boolean(isFromCli)) {
      process.exit();
    }

    // throw new Error(failedLog);
    throw new Error();
  }
};
