const React = require('react');
const { Box, Text } = require('ink');
const { UncontrolledTextInput } = require('ink-text-input');
const BigText = require('ink-big-text');
const { makeEnvs } = require('../_utils/make-envs');
const {
  setPackageJsonFieldValue,
} = require('../_utils/set-package-json-field');
const { makeDockerFile } = require('../_utils/make-dockerfile');
const { patchGitlabFile } = require('../_utils/patch-gitlab-file');
const { makeNamespacei18next } = require('../_utils/make-namespace-i18next');
// const {
//   installAdditionalPackages,
// } = require('../_utils/install-additional-packages');

class Interface extends React.Component {
  constructor() {
    super();

    this.state = {
      routerEnv: '',
      repoName: '',
      deployTokenEnv: '',
      projectEnv: '',
      step: 0,
    };

    this.handleSetRouterEnv = this.handleSetRouterEnv.bind(this);
    this.handleRepoName = this.handleRepoName.bind(this);
    this.handleSetDeployTokenEnv = this.handleSetDeployTokenEnv.bind(this);
    this.handleSetProjectName = this.handleSetProjectName.bind(this);
    this.finishSet = this.finishSet.bind(this);
    this.handleExit = this.handleExit.bind(this);
    this.handleSetNamespace = this.handleSetNamespace.bind(this);
  }

  handleRepoName(repoName) {
    this.setState({ repoName, step: 1 });
  }

  handleSetRouterEnv(routerEnv) {
    this.setState({ routerEnv, step: 2 });
  }

  handleSetDeployTokenEnv(deployTokenEnv) {
    this.setState({ deployTokenEnv, step: 3 });
  }

  handleSetProjectName(projectEnv) {
    this.setState({ projectEnv, step: 4 });
  }

  handleSetNamespace(namespace) {
    this.setState({ namespace, step: 5 });

    this.finishSet();
  }

  async finishSet() {
    const {
      routerEnv,
      repoName,
      deployTokenEnv,
      projectEnv,
      namespace,
    } = this.state;

    setPackageJsonFieldValue({ fieldName: 'name', fieldValue: repoName });

    makeDockerFile();

    await makeNamespacei18next(projectEnv);

    await patchGitlabFile(repoName);

    // installAdditionalPackages();

    makeEnvs([
      { label: 'REACT_APP_ROUTER_PREFIX', value: routerEnv },
      { label: 'PROJECT_NAME', value: projectEnv },
      { label: 'DEPLOY_TOKEN', value: deployTokenEnv },
      { label: 'NAMESPACE', value: namespace },
      { label: 'REPO_NAME', value: repoName },
      { label: 'BROWSER', value: 'none' },
    ]);

    this.handleExit();
  }

  async handleExit() {
    await this.props.onExit(); // eslint-disable-line
  }

  render() {
    const {
      step,
      repoName,
      routerEnv,
      deployTokenEnv,
      projectEnv,
      namespace,
    } = this.state;

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
              text="React Boilerplate v2.0"
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
        {repoName && <Text bold>Repo name is {repoName}</Text>}
        {deployTokenEnv && <Text bold>Token is {deployTokenEnv}</Text>}
        {routerEnv && <Text bold>REACT_APP_ROUTER_PREFIX is {routerEnv}</Text>}
        {projectEnv && <Text bold>PROJECT_NAME is {projectEnv}</Text>}
        {namespace && <Text bold>NAMESPACE is {namespace}</Text>}
        {step === 0 && (
          <>
            <Text bold>
              Введите название репозитория проекта: (например
              suppliers-portal-react-boilerplate)
            </Text>
            <Text bold>ENV is REPO_NAME</Text>
            <UncontrolledTextInput onSubmit={this.handleRepoName} />
          </>
        )}
        {step === 1 && (
          <>
            <Text bold>Введите значение префикса для первого роута</Text>
            <Text bold>!!!!!!!!!!!ВНИМАНИЕ ВНИМАНИЕ ВНИМАНИЕ!!!!!!!!!!!</Text>
            <Text bold>
              Учтите, что для Российского портала необходимо, чтобы при одной
              странице без динамического роутинга - необходимо, чтобы переменная
              имела / на конце (например, /registration/)
            </Text>
            <Text bold>ENV is REACT_APP_ROUTER_PREFIX</Text>
            <UncontrolledTextInput onSubmit={this.handleSetRouterEnv} />
          </>
        )}
        {step === 2 && (
          <>
            <Text bold>
              Введите деплой токен (узнайте его при создании проекта в админке
              cicd!!!)
            </Text>
            <Text bold>ENV is DEPLOY_TOKEN</Text>
            <UncontrolledTextInput onSubmit={this.handleSetDeployTokenEnv} />
          </>
        )}
        {step === 3 && (
          <>
            <Text bold>
              Введите название проекта в соответсвие с названием вкладки в меню
            </Text>
            <Text bold>ENV is PROJECT_NAME</Text>
            <UncontrolledTextInput onSubmit={this.handleSetProjectName} />
          </>
        )}
        {step === 4 && (
          <>
            <Text bold>Введите название неймспейса</Text>
            <Text bold>ENV is NAMESPACE</Text>
            <UncontrolledTextInput onSubmit={this.handleSetNamespace} />
          </>
        )}
      </>
    );
  }
}

module.exports = Interface;
