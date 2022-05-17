/* eslint-disable no-console */
const React = require('react');
const { Box, Text } = require('ink');
const { UncontrolledTextInput } = require('ink-text-input');
const SelectInput = require('ink-select-input').default;
const BigText = require('ink-big-text');
const { makeEnvs } = require('../_utils/make-envs');
const {
  setPackageJsonFieldValue,
} = require('../_utils/set-package-json-field');
const { makeNamespacei18next } = require('../_utils/make-namespace-i18next');
const { makeNpmConfig } = require('../_utils/sdk-api/make-npm-config');
const { makeSDKAPIConfig } = require('../_utils/sdk-api/make-sdk-api-config');
// const {
//   installAdditionalPackages,
// } = require('../_utils/install-additional-packages');

class Interface extends React.Component {
  constructor() {
    super();

    this.state = {
      projectName: '',
      sdkApiPackages: '',
      step: 0,
    };

    this.handleSetProjectName = this.handleSetProjectName.bind(this);
    this.handleSDKPackages = this.handleSDKPackages.bind(this);
    this.handleChooseSDKUsage = this.handleChooseSDKUsage.bind(this);
    this.finishSet = this.finishSet.bind(this);
    this.handleExit = this.handleExit.bind(this);
  }

  static getDerivedStateFromProps(_, state) {
    console.clear();

    return state;
  }

  handleChooseSDKUsage({ value: isUsing }) {
    if (!isUsing) {
      this.finishSet();
    }

    this.setState({ step: 2 });
  }

  handleSetProjectName(projectName) {
    this.setState({ projectName, step: 1 });
  }

  handleSDKPackages(sdkApiPackages) {
    this.setState({ sdkApiPackages, step: 3 });

    this.finishSet();
  }

  async finishSet() {
    const { projectName, sdkApiPackages } = this.state;

    setPackageJsonFieldValue({ fieldName: 'name', fieldValue: projectName });

    await makeNamespacei18next(projectName);

    if (sdkApiPackages) {
      await makeNpmConfig();
      await makeSDKAPIConfig(sdkApiPackages);
    }

    // installAdditionalPackages();

    makeEnvs([
      { label: 'BROWSER', value: 'none' },
      { label: 'EXTEND_ESLINT', value: 'true' },
    ]);

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
        {step === 1 && (
          <>
            <Text bold>Выберите, используется ли SDK-API на проекте ?</Text>
            <SelectInput
              items={[
                { label: 'Нет', value: false },
                { label: 'Да', value: true },
              ]}
              onSelect={this.handleChooseSDKUsage}
            />
          </>
        )}

        {step === 2 && (
          <>
            <Text bold>
              Введите названия пакетов SDK-API, разделяя названия запятой:
              (например @wildberries/test-sdk-api,react,react-dom)
            </Text>
            <UncontrolledTextInput onSubmit={this.handleSDKPackages} />
          </>
        )}
      </>
    );
  }
}

module.exports = Interface;
