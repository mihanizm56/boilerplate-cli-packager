const React = require('react');
const { Box, Text } = require('ink');
const { UncontrolledTextInput } = require('ink-text-input');
const BigText = require('ink-big-text');
const { makeEnvs } = require('../_utils/make-envs');
const { setProjectName } = require('../_utils/set-project-name');
const {
  installAdditionalPackages,
} = require('../_utils/install-additional-packages');

class Interface extends React.Component {
  constructor() {
    super();

    this.state = {
      projectName: '',
      routerEnv: '',
      ipLimitEnv: '',
      serverPortEnv: '',
      step: 0,
    };

    this.handleSetRouterEnv = this.handleSetRouterEnv.bind(this);
    this.handleSetIpLimit = this.handleSetIpLimit.bind(this);
    this.handleServerPort = this.handleServerPort.bind(this);
    this.handleProjectName = this.handleProjectName.bind(this);
    this.finishSet = this.finishSet.bind(this);
    this.handleExit = this.handleExit.bind(this);
  }

  handleProjectName(projectName) {
    this.setState({ projectName, step: 1 });
  }

  handleSetRouterEnv(routerEnv) {
    this.setState({ routerEnv, step: 2 });
  }

  handleSetIpLimit(ipLimitEnv) {
    this.setState({ ipLimitEnv, step: 3 });
  }

  handleServerPort(serverPortEnv) {
    this.setState({ serverPortEnv, step: 4 });

    this.finishSet();
  }

  finishSet() {
    const { routerEnv, ipLimitEnv, serverPortEnv, projectName } = this.state;

    setProjectName(projectName);

    installAdditionalPackages();

    makeEnvs([
      { label: 'REACT_APP_ROUTER_PREFIX', value: routerEnv },
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
    const {
      step,
      routerEnv,
      ipLimitEnv,
      serverPortEnv,
      projectName,
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

        {projectName && <Text bold>Project name is {projectName}</Text>}
        {routerEnv && <Text bold>REACT_APP_ROUTER_PREFIX is {routerEnv}</Text>}
        {ipLimitEnv && <Text bold>IP_LIMIT is {ipLimitEnv}</Text>}
        {serverPortEnv && <Text bold>SERVER_PORT is {serverPortEnv}</Text>}

        {step === 0 && (
          <>
            <Text bold>Введите название проекта: </Text>
            <UncontrolledTextInput onSubmit={this.handleProjectName} />
          </>
        )}

        {step === 1 && (
          <>
            <Text bold>
              Введите значение переменной среды для роутинга, обязательно с
              окончанием на / (REACT_APP_ROUTER_PREFIX)
            </Text>
            <UncontrolledTextInput onSubmit={this.handleSetRouterEnv} />
          </>
        )}

        {step === 2 && (
          <>
            <Text bold>
              Введите значение числа запросов в секунду для тестирования сервера
              статики (IP_LIMIT)
            </Text>
            <UncontrolledTextInput onSubmit={this.handleSetIpLimit} />
          </>
        )}

        {step === 3 && (
          <>
            <Text bold>
              Введите порт для тестирования сервера статики (SERVER_PORT)
            </Text>
            <UncontrolledTextInput onSubmit={this.handleServerPort} />
          </>
        )}
      </>
    );
  }
}

module.exports = Interface;
