const React = require('react');
const { Box, Text } = require('ink');
const { UncontrolledTextInput } = require('ink-text-input');
const BigText = require('ink-big-text');
const { makeEnvs } = require('../_utils/make-envs');
const { patchGitlabFile } = require('../_utils/patch-gitlab-file');
const {
  setPackageJsonFieldValue,
} = require('../_utils/set-package-json-field');
const { makeDockerFile } = require('../_utils/make-dockerfile');
const { makeNamespacei18next } = require('../_utils/make-namespace-i18next');
// const {
//   installAdditionalPackages,
// } = require('../_utils/install-additional-packages');

class Interface extends React.Component {
  constructor() {
    super();

    this.state = {
      repoName: '',
      routerEnv: '',
      ipLimitEnv: '',
      serverPortEnv: '',
      step: 0,
    };

    this.handleSetRouterEnv = this.handleSetRouterEnv.bind(this);
    this.handleSetIpLimit = this.handleSetIpLimit.bind(this);
    this.handleServerPort = this.handleServerPort.bind(this);
    this.handleRepoName = this.handleRepoName.bind(this);
    this.handleSetDeployTokenEnv = this.handleSetDeployTokenEnv.bind(this);
    this.finishSet = this.finishSet.bind(this);
    this.handleExit = this.handleExit.bind(this);
  }

  handleRepoName(repoName) {
    this.setState({ repoName, step: 1 });
  }

  handleSetRouterEnv(routerEnv) {
    this.setState({ routerEnv, step: 2 });
  }

  handleSetIpLimit(ipLimitEnv) {
    this.setState({ ipLimitEnv, step: 3 });
  }

  handleServerPort(serverPortEnv) {
    this.setState({ serverPortEnv, step: 4 });
  }

  handleSetDeployTokenEnv(deployTokenEnv) {
    this.setState({ deployTokenEnv, step: 5 });

    this.finishSet();
  }

  async finishSet() {
    const {
      routerEnv,
      ipLimitEnv,
      serverPortEnv,
      repoName,
      deployTokenEnv,
    } = this.state;

    setPackageJsonFieldValue({ fieldName: 'name', fieldValue: repoName });

    await patchGitlabFile(repoName);

    makeDockerFile(routerEnv);

    await makeNamespacei18next(repoName);

    // installAdditionalPackages(); // if you need to do smth special =)

    makeEnvs([
      { label: 'REACT_APP_ROUTER_PREFIX', value: routerEnv },
      { label: 'DEPLOY_TOKEN', value: deployTokenEnv },
      { label: 'REPO_NAME', value: repoName },
      { label: 'SERVER_PORT', value: serverPortEnv },
      { label: 'IP_LIMIT', value: ipLimitEnv },
      { label: 'BROWSER', value: 'none' },
      { label: 'PUBLIC_URL', value: '/' },
    ]);

    this.handleExit();
  }

  async handleExit() {
    await this.props.onExit(); // eslint-disable-line
  }

  render() {
    const { step, routerEnv, ipLimitEnv, serverPortEnv, repoName } = this.state;

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
        {routerEnv && <Text bold>REACT_APP_ROUTER_PREFIX is {routerEnv}</Text>}
        {ipLimitEnv && <Text bold>IP_LIMIT is {ipLimitEnv}</Text>}
        {serverPortEnv && <Text bold>SERVER_PORT is {serverPortEnv}</Text>}

        {step === 0 && (
          <>
            <Text bold>
              Введите название репозитория проекта: (например
              suppliers-portal-react-boilerplate) это же величина - будет
              неймспейс проекта при деплое и при запросе за словарем
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
              Введите значение числа запросов в секунду для тестирования сервера
              статики
            </Text>
            <Text bold>ENV is IP_LIMIT</Text>
            <UncontrolledTextInput onSubmit={this.handleSetIpLimit} />
          </>
        )}

        {step === 3 && (
          <>
            <Text bold>
              Введите порт для тестирования сервера статики (SERVER_PORT)
            </Text>
            <Text bold>ENV is SERVER_PORT</Text>
            <UncontrolledTextInput onSubmit={this.handleServerPort} />
          </>
        )}

        {step === 4 && (
          <>
            <Text bold>
              Введите деплой токен (узнайте его при создании проекта в админке
              cicd!!!)
            </Text>
            <Text bold>ENV is DEPLOY_TOKEN</Text>
            <UncontrolledTextInput onSubmit={this.handleSetDeployTokenEnv} />
          </>
        )}
      </>
    );
  }
}

module.exports = Interface;
