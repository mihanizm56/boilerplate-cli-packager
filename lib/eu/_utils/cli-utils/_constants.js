const dotenv = require('dotenv');

dotenv.config();

module.exports.OPEN_TEST_COMMANDS_VALUE = 'OPEN_TEST_COMMANDS_VALUE';
module.exports.CLOSE_TEST_COMMANDS_VALUE = 'CLOSE_TEST_COMMANDS_VALUE';
module.exports.OPEN_ADDITIONAL_COMMANDS_VALUE =
  'OPEN_ADDITIONAL_COMMANDS_VALUE';
module.exports.CLOSE_ADDITIONAL_COMMANDS_VALUE =
  'CLOSE_ADDITIONAL_COMMANDS_VALUE';
module.exports.OPEN_EXTRA_COMMANDS_VALUE = 'OPEN_EXTRA_COMMANDS_VALUE';
module.exports.CLOSE_EXTRA_COMMANDS_VALUE = 'CLOSE_EXTRA_COMMANDS_VALUE';
module.exports.COMMIT_COMMAND_VALUE = 'add . && git commit --no-edit';
module.exports.COMMIT_COMMAND_LABEL = 'Добавить все изменения и сделать коммит';
module.exports.DOCKER_BUILD_COMMAND_LABEL =
  'Собрать докер образ и запустить под тегом test (только mac/linux с docker)';
module.exports.NPM_VULNERABILITIES_COMMAND_LABEL =
  'Анализ уязвимостей npm пакетов';
module.exports.NPM_VULNERABILITIES_COMMAND_VALUE = 'resolve-audit';

module.exports.dockerPort = process.env.PLT_PORT || 443;
