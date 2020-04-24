const React = require('react');
const importJsx = require('import-jsx');
const { AppContext } = require('ink');

const Interface = importJsx('./interface.jsx');

/* eslint-disable */
class App extends React.Component {
  render() {
    return (
      <AppContext.Consumer>
        {({ exit }) => <Interface onExit={exit} />}
      </AppContext.Consumer>
    );
  }
}
module.exports = App;
