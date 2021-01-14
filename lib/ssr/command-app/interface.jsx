const React = require('react');
const { Box, Text, Color } = require('ink');
const BigText = require('ink-big-text');
const SelectInput = require('ink-select-input').default;
const Spinner = require('ink-spinner').default;
const { devServerLog } = require('../../utils/dev-server-logger');
const { scriptExecute } = require('../_utils/cli-utils/run-executor-script');
const { processKiller } = require('../_utils/cli-utils/process-killer');
const {
  mainCommands,
  testCommands,
  additionalCommands,
  deployCommands,
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
      withLoader: false,
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
    isIOInherit,
    isCiScript,
    withLoader,
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
        withLoader,
      });

      const child = await scriptExecute({
        label,
        value,
        type,
        isIOInherit,
        isCiScript,
        withLoader,
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
      commandsList: deployCommands,
    });
  }

  render() {
    const { commandName, isLoading, commandsList, withLoader } = this.state;

    return (
      <>
        {!isLoading && (
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
          </Box>
        )}
        {!commandName && <Text bold>Выберите команду</Text>}
        {!commandName && (
          <SelectInput
            items={commandsList}
            onSelect={this.handleselectActActionion}
          />
        )}

        {commandName && withLoader && isLoading && (
          <Box>
            <Text bold>Выполняется команда: {commandName}</Text>
            <Box width="100%">
              <Color green>
                <Spinner type="shark" />
              </Color>
            </Box>
          </Box>
        )}
      </>
    );
  }
}

module.exports = Interface;
