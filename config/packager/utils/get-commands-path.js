module.exports.getCommandsPath = prefix => {
  switch (prefix) {
    case 'eu':
      return '../commands/commands-eu.json';

    case 'shared':
      return '../commands/commands-shared.json';

    case 'ru':
      return '../commands/commands-ru.json';

    default:
      return '../commands/commands-ru.json';
  }
};
