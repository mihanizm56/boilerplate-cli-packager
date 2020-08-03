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
      projectName: '',
      step: 0,
    };

    this.handleSetProjectName = this.handleSetProjectName.bind(this);
    this.finishSet = this.finishSet.bind(this);
    this.handleExit = this.handleExit.bind(this);
  }

  static getDerivedStateFromProps(_, state) {
    // eslint-disable-next-line no-console
    console.clear();

    return state;
  }

  handleSetProjectName(projectName) {
    this.setState({ projectName, step: 1 });

    this.finishSet();
  }

  async finishSet() {
    const { projectName } = this.state;

    setPackageJsonFieldValue({ fieldName: 'name', fieldValue: projectName });

    await makeNamespacei18next(projectName);

    // installAdditionalPackages();

    makeEnvs([{ label: 'BROWSER', value: 'none' }]);

    this.handleExit();
  }

  async handleExit() {
    await this.props.onExit(); // eslint-disable-line
  }

  render() {
    const { step, projectName } = this.state;

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
        {projectName && <Text bold>Project Name is {projectName}</Text>}
        {step === 0 && (
          <>
            <Text bold>
              Введите название проекта: (например ui-registration)
            </Text>
            <UncontrolledTextInput onSubmit={this.handleSetProjectName} />
          </>
        )}
      </>
    );
  }
}

module.exports = Interface;
