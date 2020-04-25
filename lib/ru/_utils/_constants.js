const dotenv = require('dotenv');

dotenv.config();

module.exports.repoName = process.env.REPO_NAME;
module.exports.deployToken = process.env.DEPLOY_TOKEN;
module.exports.projectName = process.env.PROJECT_NAME;
