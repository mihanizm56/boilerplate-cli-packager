const START_SERVER_STATIC = 'node integration-tests/server/static.js';
const CONCURRENCY_SETTINGS = '-c 6';
const TESTS_PATH = 'integration-tests/__tests__/';
const VIDEO_SETTINGS =
  "--video integration-tests/__tests__/ --video-options failedOnly=true,pathPattern='${FIXTURE}/videoshot-with-error/${TEST}.mp4'"; // eslint-disable-line
const SPEED_SETTINGS = '--speed 0.5';
const BASE_COMMAND = 'npx cross-env TESTCAFE_PORT=5005 npx testcafe';
const MANUAL_START = `echo MANUAL-START && ${BASE_COMMAND} chrome`;
const CHROME_BROWSER_START = `echo DESKTOP-CHROME && ${BASE_COMMAND} chrome:headless`;
const CHROME_MOBILE_BROWSER_START = `echo MOBILE-CHROME && ${BASE_COMMAND} "chrome:headless:emulation:device=iphone X"`;
const FIREFOX_BROWSER_START = `echo DESKTOP-FIREFOX && ${BASE_COMMAND} firefox:headless`;

const getConfig = customBrowserCommand =>
  customBrowserCommand
    ? `${customBrowserCommand} ${CONCURRENCY_SETTINGS} ${VIDEO_SETTINGS} ${SPEED_SETTINGS} ${TESTS_PATH} -a ${START_SERVER_STATIC}`
    : `${MANUAL_START} ${VIDEO_SETTINGS} ${SPEED_SETTINGS} ${TESTS_PATH} -a ${START_SERVER_STATIC}`;

module.exports.browserSettings = {
  chrome: getConfig(CHROME_BROWSER_START),
  chromeMobile: getConfig(CHROME_MOBILE_BROWSER_START),
  firefox: getConfig(FIREFOX_BROWSER_START),
  manualConfig: getConfig(),
};
