const path = require('path');
const yaml = require('js-yaml');
const { readFile, writeFile } = require('../../utils/fs-promises');

const makeBeforeScriptConfig = name => [
  `export SERVICE="${name}"`,
  'export IMAGE_NAME="$CI_REGISTRY_IMAGE/$SERVICE"',
  'chmod +x config/env/make-runtime-config.js',
];

module.exports.patchGitlabFile = async repoName =>
  new Promise(async resolve => {
    const fileContents = await readFile(
      path.join(process.cwd(), '.gitlab-ci.yml'),
      'utf8',
    );
    const data = yaml.safeLoad(fileContents);
    const beforeScriptConfig = makeBeforeScriptConfig(repoName);

    // eslint-disable-next-line
    const newData = { ...data, before_script: beforeScriptConfig };

    const patchedGitlabConfig = yaml.safeDump(newData);
    await writeFile('.gitlab-ci.yml', patchedGitlabConfig, 'utf8');

    resolve();
  });
