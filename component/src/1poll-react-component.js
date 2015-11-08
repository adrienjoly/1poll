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
      //console.log('new props. options:');
      //console.table(props.options);
      this.setState({
        options: props.options.map(this._checkByDefault)
      }, this._refreshSelectedOptions);
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
    /*
    componentDidUpdate: function() {
      console.log('1poll componentDidUpdate. selectedOptions:');
      console.table(this.state.selectedOptions);
    },
    */
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
      //console.log('_refreshSelectedOptions. options:');
      //console.table(this.state.options);
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
      this.state.options[parseInt(optionIndex)].checked = checked;
      this._refreshSelectedOptions();
    },
    _onCheck: function(evt, checked) {
      this._toggleOption(evt.target.getAttribute('data-index'), checked);
    },
    _handleEntryBlur: function(evt) {
      if (!evt.target.value.trim()) return;
      this.props.onNewOption({
        name: evt.target.value,
        defaultChecked: false
      });
    },
    _handleAddOption: function(evt) {
      this.props.onNewOption({
        name: evt.target.value,
        defaultChecked: true
      });
    }
  });

  return Poll;

})();
