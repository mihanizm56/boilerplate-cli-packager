const React = require('react');
const { Box, Text } = require('ink');
const { UncontrolledTextInput } = require('ink-text-input');
const BigText = require('ink-big-text');
const { makeEnvs } = require('../_utils/make-envs');
const {
  setPackageJsonFieldValue,
} = require('../_utils/set-package-json-field');
const { makeNamespacei18next } = require('../_utils/make-namespace-i18next');
// const {
//   installAdditionalPackages,
// } = require('../_utils/install-additional-packages');

class Interface extends React.Component {
  constructor() {
    super();

    this.state = {
      repoName: '',
      deployTokenEnv: '',
      namespace: '',
      step: 0,
    };

    this.handleRepoName = this.handleRepoName.bind(this);
    this.handleSetDeployTokenEnv = this.handleSetDeployTokenEnv.bind(this);
    this.handleSetNamespace = this.handleSetNamespace.bind(this);
    this.finishSet = this.finishSet.bind(this);
    this.handleExit = this.handleExit.bind(this);
  }

  handleRepoName(repoName) {
    this.setState({ repoName, step: 1 });
  }

  handleSetDeployTokenEnv(deployTokenEnv) {
    this.setState({ deployTokenEnv, step: 2 });
  }

  handleSetNamespace(namespace) {
    this.setState({ namespace, step: 3 });

    this.finishSet();
  }

  async finishSet() {
    const { repoName, deployTokenEnv, namespace } = this.state;

    setPackageJsonFieldValue({ fieldName: 'name', fieldValue: repoName });

    await makeNamespacei18next(namespace);

    // installAdditionalPackages(); // if you need to do smth special =)

    makeEnvs([
      { label: 'DEPLOY_TOKEN', value: deployTokenEnv },
      { label: 'REPO_NAME', value: repoName },
      { label: 'NAMESPACE', value: namespace },
      { label: 'BROWSER', value: 'none' },
      { label: 'PUBLIC_URL', value: '/' },
    ]);

    this.handleExit();
  }

  async handleExit() {
    await this.props.onExit(); // eslint-disable-line
  }

  render() {
    const { step, deployTokenEnv, repoName, namespace } = this.state;

    return (
      <>
        <Box flexDirection="column">
          <Box height={5} width="100%">
            <BigText
              align="center"
              colors={['magenta', 'magenta', 'magenta']}
              font="chrome"
              text="Wildberries"
            />
          </Box>
          <Box height={6} width="100%">
            <BigText
              align="center"
              colors={['magenta', 'magenta', 'magenta']}
              font="chrome"
              text="React Boilerplate v1.1"
            />
          </Box>
          <Box height={6} width="100%">
            <BigText
              align="center"
              colors={['magenta', 'magenta', 'magenta']}
              font="chrome"
              text="Project-setup"
            />
          </Box>
        </Box>
        {repoName && <Text bold>REPO_NAME is {repoName}</Text>}
        {deployTokenEnv && <Text bold>DEPLOY_TOKEN is {deployTokenEnv}</Text>}
        {namespace && <Text bold>NAMESPACE is {namespace}</Text>}

        {step === 0 && (
          <>
            <Text bold>
              Введите название репозитория проекта: (например
              suppliers-portal-react-boilerplate) это же величина - будет
              название проекта в wildberries ci/cd
            </Text>
            <Text bold>ENV is REPO_NAME</Text>
            <UncontrolledTextInput onSubmit={this.handleRepoName} />
          </>
        )}

        {step === 1 && (
          <>
            <Text bold>
              Введите деплой токен (узнайте его при создании проекта в админке
              ci/cd!!!)
            </Text>
            <Text bold>ENV is DEPLOY_TOKEN</Text>
            <UncontrolledTextInput onSubmit={this.handleSetDeployTokenEnv} />
          </>
        )}

        {step === 2 && (
          <>
            <Text bold>Введите неймспейс приложения в wildberries ci/cd</Text>
            <Text bold>ENV is NAMESPACE</Text>
            <UncontrolledTextInput onSubmit={this.handleSetNamespace} />
          </>
        )}
      </>
    );
  }
}

module.exports = Interface;
