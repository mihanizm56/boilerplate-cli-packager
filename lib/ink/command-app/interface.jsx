const React = require('react');
const { Box, Text, Color } = require('ink');
const BigText = require('ink-big-text');
const SelectInput = require('ink-select-input').default;
const Spinner = require('ink-spinner').default;
const { devServerLog } = require('../../../utils/dev-server-logger');
const { scriptExecute } = require('../_utils/cli-utils/run-executor-script');
const { processKiller } = require('../_utils/cli-utils/process-killer');
const {
  mainCommands,
  testCommands,
  additionalCommands,
  extraCommands,
} = require('../_utils/cli-utils/npm-scripts');
const {
  OPEN_TEST_COMMANDS_VALUE,
  CLOSE_TEST_COMMANDS_VALUE,
  OPEN_ADDITIONAL_COMMANDS_VALUE,
  CLOSE_ADDITIONAL_COMMANDS_VALUE,
  OPEN_EXTRA_COMMANDS_VALUE,
  CLOSE_EXTRA_COMMANDS_VALUE,
} = require('../_utils/cli-utils/_constants');

class Interface extends React.PureComponent {
  constructor() {
    super();

    this.state = {
      commandName: '',
      commandsList: mainCommands,
      isLoading: false,
    };

    this.handleselectActActionion = this.handleselectActActionion.bind(this);
    this.handleOpenTestList = this.handleOpenTestList.bind(this);
    this.handleCloseList = this.handleCloseList.bind(this);
    this.handleOpenExtraList = this.handleOpenExtraList.bind(this);
  }

  async componentWillUnmount() {
    if (Boolean(this.childProcess)) {
      process.kill(-this.childProcess.pid);
    }

    await processKiller();
  }

  componentDidCatch(error) {
    devServerLog('error', error);
  }

  async handleselectActActionion({
    label,
    value,
    type,
    isDetached,
    isCiScript,
  }) {
    if (value === OPEN_TEST_COMMANDS_VALUE) {
      this.handleOpenTestList();
    } else if (value === CLOSE_TEST_COMMANDS_VALUE) {
      this.handleCloseList();
    } else if (value === OPEN_ADDITIONAL_COMMANDS_VALUE) {
      this.handleOpenAdditionalList();
    } else if (value === CLOSE_ADDITIONAL_COMMANDS_VALUE) {
      this.handleCloseList();
    } else if (value === OPEN_EXTRA_COMMANDS_VALUE) {
      this.handleOpenExtraList();
    } else if (value === CLOSE_EXTRA_COMMANDS_VALUE) {
      this.handleCloseList();
    } else {
      this.setState({
        commandName: label,
        isLoading: true,
      });

      const child = await scriptExecute({
        label,
        value,
        type,
        isDetached,
        isCiScript,
      });

      this.childProcess = child;
    }
  }

  handleOpenTestList() {
    this.setState({
      commandsList: testCommands,
    });
  }

  handleOpenAdditionalList() {
    this.setState(() => ({ commandsList: [] }));

    this.setState({
      commandsList: additionalCommands,
    });
  }

  handleCloseList() {
    this.setState(() => ({ commandsList: [] }));

    this.setState({
      commandsList: mainCommands,
    });
  }

  handleOpenExtraList() {
    this.setState(() => ({ commandsList: [] }));

    this.setState({
      commandsList: extraCommands,
    });
  }

  render() {
    const { commandName, isLoading, commandsList } = this.state;

    return (
      <>
        {!isLoading && (
          <>
            <Box width="100%">
              <BigText
                text="WB React Boilerplate"
                font="chrome"
                backgroundColor="magenta"
                lineHeight={0.1}
                colors={['white', 'white', 'white']}
                space
              />
            </Box>
            <Box height={2} />
          </>
        )}
        {!commandName && <Text bold>Выберите команду</Text>}
        {commandName && isLoading && (
          <Box>
            <Text bold>Выполняется команда: {commandName}</Text>
            <Box width="100%">
              <Color green>
                <Spinner type="shark" />
              </Color>
            </Box>
          </Box>
        )}
        {!commandName && (
          <SelectInput
            items={commandsList}
            onSelect={this.handleselectActActionion}
          />
        )}
      </>
    );
  }
}

module.exports = Interface;
