const React = require('react');
const importJsx = require('import-jsx');
const { render } = require('ink');

const App = importJsx('./app.jsx');

render(React.createElement(App));
