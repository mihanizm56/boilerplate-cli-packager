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

    this.finishSet();
  }

  async finishSet() {
    const { routerEnv, repoName, deployTokenEnv, projectEnv } = this.state;

    setPackageJsonFieldValue({ fieldName: 'name', fieldValue: repoName });

    makeDockerFile();

    await patchGitlabFile(repoName);

    // installAdditionalPackages();

    makeEnvs([
      { label: 'REACT_APP_ROUTER_PREFIX', value: routerEnv },
      { label: 'PROJECT_NAME', value: projectEnv },
      { label: 'DEPLOY_TOKEN', value: deployTokenEnv },
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
    } = this.state;

    return (
      <>
        <Box width="100%">
          <BigText
            text="WB React Boilerplate"
            font="chrome"
            backgroundColor="magenta"
            colors={['white', 'white', 'white']}
            space
          />
          <Text bold>Предварительная настройка проекта</Text>
        </Box>
        <Box height={2} />
        {repoName && <Text bold>Repo name is {repoName}</Text>}
        {deployTokenEnv && <Text bold>Token is {deployTokenEnv}</Text>}
        {routerEnv && <Text bold>REACT_APP_ROUTER_PREFIX is {routerEnv}</Text>}
        {projectEnv && <Text bold>PROJECT_NAME is {projectEnv}</Text>}
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
      </>
    );
  }
}

module.exports = Interface;
