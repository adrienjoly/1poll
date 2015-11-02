(function(){
  'use strict';
  var React = require('react');
  var ReactDOM = require('react-dom');
  var injectTapEventPlugin = require('react-tap-event-plugin');
  var RaisedButton = require('material-ui/lib/raised-button');

  // Needed for React Developer Tools
  window.React = React;

  var Main = React.createClass({
    render() {
      return (
        React.createElement(RaisedButton, {
          label: 'Sample button',
          primary: true,
          onTouchTap: this._handleTouchTap
        })
      );
    },
    _handleTouchTap() {
      alert('touché');
    },
  });
  //module.exports = Main;

  // Needed for onTouchTap
  // Can go away when react 1.0 release, cf https://github.com/zilverline/react-tap-event-plugin
  injectTapEventPlugin();

  // Render the main app react component into the app div.
  // For more details see: https://facebook.github.io/react/docs/top-level-api.html#react.render
  ReactDOM.render(React.createElement(Main, {}), document.getElementById('app'));

  console.log('1poll-react-component loaded.');
})();
