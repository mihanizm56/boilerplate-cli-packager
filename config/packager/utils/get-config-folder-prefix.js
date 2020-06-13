module.exports.getConfigFolderPrefix = flags => {
  if (flags.euro) {
    return 'eu';
  }

  if (flags.shared) {
    return 'shared';
  }

  return 'ru';
};
