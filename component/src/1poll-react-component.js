module.exports = (function(){
  'use strict';
  var React = require('react');
  var Checkbox = require('material-ui/lib/checkbox');
  var TextField = require('material-ui/lib/text-field');

  function renderComponent(children) {
    var divContainer = [ 'div', { className: '1poll-component' } ];
    return React.createElement.apply(React, divContainer.concat(children));
  }

  var Poll = React.createClass({
    getDefaultProps: function() {
      return {
        options: [],
        labelStyle: undefined,
        onSelectionChange: undefined, // function([ { name: String, defaultChecked: Boolean } ])
        onNewOption: undefined // function({ name: String, defaultChecked: Boolean }) that should update this.props.options
      };
    },
    getInitialState: function() {
      return {
        options: this.props.options.map(this._checkByDefault),
        selectedOptions: []
      };
    },
    componentWillReceiveProps: function(props) {
      this.setState({
        options: props.options.map(this._checkByDefault)
      }, this._refreshSelectedOptions);
    },
    shouldComponentUpdate: function(nextProps, nextState) {
      return (nextProps != this.props || this.state.options != nextState.options);
    },
    render: function() {
      return renderComponent(this.state.options.map(this._renderOption).concat([
        React.createElement(TextField, {
          hintText: 'Add an option',
          onBlur: this._handleEntryBlur,
          onEnterKeyDown: this._handleAddOption,
          style: {
            paddingLeft: '42px',
            marginBottom: '20px'
          }
        })
      ]));
    },
    _checkByDefault: function(option) {
      option.checked = option.checked || !!option.defaultChecked;
      return option;
    },
    _renderOption: function(option, index) {
      return React.createElement(Checkbox, {
        name: 'selected',
        'data-index': index,
        value: option.name,
        label: option.name,
        defaultChecked: option.checked,
        onCheck: this._onCheck,
        labelStyle: this.props.labelStyle,
        style: { marginTop: '16px' }
      });
    },
    _refreshSelectedOptions: function() {
      var selectedOptions = [];
      for (var i in this.state.options) {
        if (this.state.options[i].checked) {
          selectedOptions.push(this.state.options[i]);
        }
      }
      if (this.state.selectedOptions.length != selectedOptions.length) {
        this.setState({ selectedOptions: selectedOptions });
        this.props.onSelectionChange && this.props.onSelectionChange(selectedOptions);
      }
    },
    _toggleOption: function(optionIndex, checked) {
      var options = this.state.options.slice(); // clone array
      options[parseInt(optionIndex)].checked = checked;
      this.setState({ options: options }, this._refreshSelectedOptions);
    },
    _onCheck: function(evt, checked) {
      this._toggleOption(evt.target.getAttribute('data-index'), checked);
    },
    _handleEntryBlur: function(evt) {
      if (!evt.target.value.trim()) return;
      this._handleAddOption(evt, true);
    },
    _handleAddOption: function(evt, notChecked) {
      var newOption = {
        name: evt.target.value,
        checked: notChecked ? false : true,
        defaultChecked: notChecked ? false : true
      };
      if (this.props.onNewOption) {
        this.props.onNewOption(newOption);
      } else {
        this.setState({
          options: this.state.options.concat([ newOption ])
        });
      }
    }
  });

  return Poll;

})();
