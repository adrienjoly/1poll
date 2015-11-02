(function(){
  'use strict';
  var React = require('react');
  var ReactDOM = require('react-dom');
  var injectTapEventPlugin = require('react-tap-event-plugin');
  var Poll = require('./1poll-react-component.js');

  // Needed for React Developer Tools
  window.React = React;

  // Needed for onTouchTap
  // Can go away when react 1.0 release, cf https://github.com/zilverline/react-tap-event-plugin
  injectTapEventPlugin();

  // Render the main app react component into the app div.
  // For more details see: https://facebook.github.io/react/docs/top-level-api.html#react.render
  ReactDOM.render(React.createElement(Poll, {}), document.getElementById('app'));

  console.log('1poll-sample-app loaded.');
})();
