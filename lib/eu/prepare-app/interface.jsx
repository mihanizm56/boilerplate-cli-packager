const React = require('react');
const { Box, Text } = require('ink');
const { UncontrolledTextInput } = require('ink-text-input');
const BigText = require('ink-big-text');
const { makeEnvs } = require('../_utils/make-envs');
const {
  setPackageJsonFieldValue,
} = require('../_utils/set-package-json-field');
const {
  installAdditionalPackages,
} = require('../_utils/install-additional-packages');

class Interface extends React.Component {
  constructor() {
    super();

    this.state = {
      projectName: '',
      routerEnv: '',
      step: 0,
    };

    this.handleSetRouterEnv = this.handleSetRouterEnv.bind(this);
    this.handleProjectName = this.handleProjectName.bind(this);
    this.finishSet = this.finishSet.bind(this);
    this.handleExit = this.handleExit.bind(this);
  }

  handleProjectName(projectName) {
    this.setState({ projectName, step: 1 });
  }

  handleSetRouterEnv(routerEnv) {
    this.setState({ routerEnv, step: 2 });

    this.finishSet();
  }

  finishSet() {
    const { routerEnv, projectName } = this.state;

    setPackageJsonFieldValue({ fieldName: 'name', fieldValue: projectName });
    // setDockerfileEnvValues([
    //   { label: 'REACT_APP_ROUTER_PREFIX', value: routerEnv },
    // ]);

    // installAdditionalPackages();

    makeEnvs([
      { label: 'REACT_APP_ROUTER_PREFIX', value: routerEnv },
      { label: 'PROJECT_NAME', value: projectName },
      { label: 'BROWSER', value: 'none' },
    ]);

    this.handleExit();
  }

  async handleExit() {
    await this.props.onExit(); // eslint-disable-line
  }

  render() {
    const { step, projectName, routerEnv } = this.state;

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
      </>
    );
  }
}

module.exports = Interface;
