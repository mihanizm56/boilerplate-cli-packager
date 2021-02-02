module.exports.getCommandsPath = prefix => {
  switch (prefix) {
    case 'eu':
      return '../commands/commands-eu.json';

    case 'shared':
      return '../commands/commands-shared.json';

    case 'ru':
      return '../commands/commands-ru.json';

    case 'pure':
      return '../commands/commands-pure.json';

    case 'gatsby':
      return '../commands/commands-gatsby.json';

    case 'graphql':
      return '../commands/commands-graphql.json';

    case 'ssr':
      return '../commands/commands-ssr.json';

    default:
      return '../commands/commands-ru.json';
  }
};
