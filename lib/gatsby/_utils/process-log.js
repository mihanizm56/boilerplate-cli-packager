const { getIsInvalidLog, prepareErrorLog } = require('./loggers');

module.exports.processLog = ({ logString, isFromCli, process }) => {
  const isInvalidLog = getIsInvalidLog(logString);

  if (isInvalidLog) {
    prepareErrorLog(logString);

    if (Boolean(isFromCli)) {
      process.exit();
    }

    throw new Error();
  }
};
