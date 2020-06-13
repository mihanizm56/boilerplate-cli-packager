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

  return 'ru';
};
