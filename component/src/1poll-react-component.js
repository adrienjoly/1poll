module.exports = (function(){
  'use strict';
  var React = require('react');
  var ReactDOM = require('react-dom');
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

  var Poll = React.createClass({
    getInitialState() {
      return {
        options: this.props.options || []
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
          onTouchTap: this.props.onSubmit || this._handleSubmit
        })
      ]));
    },
    _handleAddOption(evt) {
      this.setState({
        options: this.state.options.concat([ {
          name: evt.target.value,
          defaultChecked: true
        } ])
      });
    },
    _handleSubmit(evt) {
      // Propagate event to component's submit handler(s), if any
      var myEvent = document.createEventObject ?
        document.createEventObject() :
        document.createEvent("Events");
      myEvent.initEvent('submit', true, true);
      var targetElement = ReactDOM.findDOMNode(this); // || document.getElementById('app');
      targetElement.dispatchEvent ?
        targetElement.dispatchEvent(myEvent) :
        targetElement.fireEvent('onSubmit', myEvent);
    }
  });

  return Poll;

})();
