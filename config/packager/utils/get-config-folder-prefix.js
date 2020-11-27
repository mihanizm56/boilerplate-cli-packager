module.exports.getConfigFolderPrefix = flags => {
  if (flags.euro) {
    return 'eu';
  }

  if (flags.pure) {
    return 'pure';
  }

  if (flags.shared) {
    return 'shared';
  }

  if (flags.gatsby) {
    return 'gatsby';
  }

  if (flags.graphql) {
    return 'graphql';
  }

  return 'ru';
};
