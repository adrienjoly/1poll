module.exports = (function(){
  'use strict';
  var React = require('react');
  var RaisedButton = require('material-ui/lib/raised-button');
  var injectTapEventPlugin = require('react-tap-event-plugin');
  var Poll = require('react-1poll');

  // Needed for onTouchTap
  // Can go away when react 1.0 release, cf https://github.com/zilverline/react-tap-event-plugin
  injectTapEventPlugin();

  return class PollForm extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        disabled: false,
        selectedOptions: [],
        validEmail: false
      };
    }

    render = () => {
      return (
        <div className='react-poll-form'>
          <p>Enter a question</p>
          <Poll
            options={this.props.options}
            labelStyle={{ color: 'auto' }}
            onNewOption={this.props.onNewOption}
            onSelectionChange={this.onSelectionChange}
          />
          <RaisedButton
            disabled={this.state.disabled}
            label='Submit'
            primary={true}
            backgroundColor='#00a651'
            style={{
              display: 'block', // to fill the parent div's width
            }}
            onTouchTap={this.props.onValidSubmit}
          />
        </div>
      );
    }

    onSelectionChange = (selectedOptions) => {
      this.setState({ selectedOptions: selectedOptions });
    }

  }

})();
