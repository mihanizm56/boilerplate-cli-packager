/* eslint-disable no-console */
// eslint-disable-next-line
const colors = require('colors');

module.exports.cliRunLogger = () => {
  console.clear();

  console.log('');
  console.log('BOILERPLATE IS RUNNING'.magenta);
  console.log('');
};

module.exports.getIsInvalidLog = logString =>
  logString.indexOf('Error') !== -1 ||
  logString.indexOf('Error:') !== -1 ||
  logString.indexOf('error ') !== -1 ||
  logString.indexOf('errors ') !== -1 ||
  logString.indexOf('failed') !== -1 ||
  logString.indexOf('Unresolved issues found') !== -1 ||
  logString.indexOf('warning  ') !== -1 ||
  logString.indexOf('Failed to compile') !== -1 ||
  logString.indexOf('✖') !== -1;

module.exports.prepareErrorLog = logString => {
  console.log('Catched the error:'.red.underline);
  console.log(logString);
  console.log('Error Information:'.red.underline);
  console.log('cli catch "Error"', logString.indexOf('Error') !== -1);
  console.log('cli catch "error "', logString.indexOf('error ') !== -1);
  console.log('position', logString.indexOf('error '));
  console.log('cli catch "failed"', logString.indexOf('failed') !== -1);
  console.log('position', logString.indexOf('failed'));
  console.log(
    'cli catch "Unresolved issues found"',
    logString.indexOf('Unresolved issues found') !== -1,
  );
  console.log('position', logString.indexOf('Unresolved issues found'));
  console.log('cli catch "warning  "', logString.indexOf('warning  ') !== -1);
  console.log('position', logString.indexOf('warning  '));
  console.log(
    'cli catch "Failed to compile"',
    logString.indexOf('Failed to compile') !== -1,
  );
  console.log('position', logString.indexOf('Failed to compile'));
  console.log('cli catch "✖"', logString.indexOf('✖') !== -1);
  console.log('position', logString.indexOf('✖'));
  console.log('');
  console.log('');
  console.log('Please, scroll up to see the full log'.red.underline);
  console.log('You shall not pass!'.red.underline);
};
