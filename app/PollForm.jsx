module.exports = (function(){
  'use strict';
  var React = require('react');
  var Paper = require('material-ui/lib/paper');
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
        options: this.props.options || []
      };
      this._onNewOption = this._onNewOption.bind(this);
    }

    componentWillReceiveProps(nextProps) {
      this.setState({
        options: nextProps.options || []
      });
    }

    render() {
      return (
        <div className='react-poll-form'>
          <Paper style={{ padding: '16px', paddingTop: '1px', color: '#333' }}>
            <Poll
              ref='poll'
              disabled={this.props.disabled}
              options={this.state.options}
              allowNewEntries={this.props.allowNewEntries}
              onNewOption={this._onNewOption}
              labelStyle={{ color: 'auto' }}
            />
            <RaisedButton
              disabled={this.props.disabled || this.state.options.length == 0}
              label={this.props.callToAction || 'Submit'}
              primary={true}
              backgroundColor='#00a651'
              style={{
                display: 'block', // to fill the parent div's width
                marginTop: '16px'
              }}
              onTouchTap={this.props.onValidSubmit}
            />
          </Paper>
        </div>
      );
    }

    _onNewOption(newOption) {
      this.setState({
        options: this.state.options.concat([ newOption ])
      }); 
    }

    getOptions() {
      return this.state.options;
    }

  }

})();
