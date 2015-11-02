module.exports = (function(){
  'use strict';
  var React = require('react');
  var RaisedButton = require('material-ui/lib/raised-button');

  console.log('1poll-react-component loaded.');

  return React.createClass({
    render() {
      return (
        // TODO: add checkboxes
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

})();
