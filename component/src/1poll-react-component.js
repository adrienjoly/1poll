module.exports = (function(){
  'use strict';
  var React = require('react');
  var Paper = require('material-ui/lib/paper');
  var Checkbox = require('material-ui/lib/checkbox');
  var TextField = require('material-ui/lib/text-field');
  var RaisedButton = require('material-ui/lib/raised-button');

  function renderComponent(children) {
    var divContainer = [ Paper, {
      className: '1poll-component',
      style: {
        padding: '16px',
        paddingTop: '1px'
      }
    } ];
    return React.createElement.apply(React, divContainer.concat(children));
  }

  function renderOption(option) {
    return React.createElement(Checkbox, {
      name: 'selected',
      value: option.name,
      label: option.name,
      defaultChecked: option.defaultChecked,
      style: { marginTop: '16px' }
    });
  }

  return React.createClass({
    getInitialState() {
      return {
        options: [
          { name: 'monday' },
          { name: 'tuesday' },
          { name: 'wednesday' }
        ]
      };
    },
    render() {
      return renderComponent(this.state.options.map(renderOption).concat([
        React.createElement(TextField, {
          hintText: 'Add an option',
          onEnterKeyDown: this._handleAddOption,
          style: {
            paddingLeft: '42px',
            marginBottom: '20px'
          }
        }),
        React.createElement(RaisedButton, {
          label: 'Submit',
          primary: true,
          style: { display: 'block' },
          onTouchTap: this._handleTouchTap
        })
      ]));
    },
    _handleAddOption(evt) {
      console.log('added', evt.target.value);
      this.setState({
        options: this.state.options.concat([ {
          name: evt.target.value,
          defaultChecked: true
        } ])
      });
    },
    _handleTouchTap(evt) {
      console.log('touché', this.state.options);
      // Create a event that can be handled from outside of the react component
      var myEvent = document.createEventObject ?
        document.createEventObject() :
        document.createEvent("Events");
      myEvent.initEvent('submit', true, true);
      var targetElement = evt.target;
      targetElement = document.getElementById('app');
      targetElement.dispatchEvent ?
        targetElement.dispatchEvent(myEvent) :
        targetElement.fireEvent('onSubmit', myEvent);
    }
  });

})();
