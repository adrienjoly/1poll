'use strict';

import React from 'react';
import DocumentTitle from 'react-document-title';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import RaisedButton from 'material-ui/RaisedButton';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Poll from 'react-1poll';

// Needed for onTouchTap
// Can go away when react 1.0 release, cf https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

class CreateForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      options: this.props.defaultItems,
      entryToggle: true,
      disabled: false
    };
    this._onNewOption = this._onNewOption.bind(this);
    this._onToggleEntry = this._onToggleEntry.bind(this);
    this._submitNewPoll = this._submitNewPoll.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps != this.props || nextState != this.state;
  }

  componentDidMount() {
    this.refs.title.focus();
  }

  componentDidUpdate() {
    this.props.onUpdate && this.props.onUpdate.call(this, arguments);
  }

  render() {
    return (
    <DocumentTitle title='Create a new 1poll'>
      <form action="#">
        <div className="row">
          <div className="user-signup__intro">
            <TextField
              ref='title'
              autoFocus
              disabled={this.state.disabled}
              hintText="Enter your poll question"
              hintStyle={{ color: '#999' }}
              inputStyle={{ textAlign: 'center', color: 'white' }}
              underlineStyle={{ borderColor: 'transparent' }}
              underlineFocusStyle={{ borderColor: '#999' }}
              style={{ fontSize: '22px', width: '100%', marginBottom: '20px' }}
            />
            {/*
            <TextField
              ref='subtitle'
              disabled={this.state.disabled}
              hintText='Enter a description / call to action (optional)'
              hintStyle={{ color: '#999' }}
              inputStyle={{ textAlign: 'center', color: 'white' }}
              underlineStyle={{ borderColor: 'transparent' }}
              underlineFocusStyle={{ borderColor: '#999' }}
              style={{ fontSize: '14px', width: '100%' }}
            />
            */}
          </div>
        </div>
        <div className="row">
          <div className='react-poll-form'>
            <Paper style={{ padding: '16px', paddingTop: '1px', color: '#333' }}>
              <Poll
                ref='poll'
                disabled={this.state.disabled}
                options={this.state.options}
                allowNewEntries={true}
                onNewOption={this._onNewOption}
                labelStyle={{ color: 'auto' }}
              />
              <RaisedButton
                disabled={this.state.disabled || this.state.options.length == 0}
                label='Publish'
                primary={true}
                backgroundColor='#00a651'
                style={{
                  display: 'block', // to fill the parent div's width
                  marginTop: '16px'
                }}
                onTouchTap={this._submitNewPoll}
              />
            </Paper>
          </div>
          <Checkbox
            name='entryToggle'
            label='Allow voters to add their own options'
            checked={this.state.entryToggle}
            onCheck={this._onToggleEntry}
            labelStyle={{ color: '#999', fontFamily: 'Roboto, sans-serif' }}
            style={{ marginTop: '20px' }}
          />
        </div>
      </form>
    </DocumentTitle>
    );
  }

  _onNewOption(newOption) {
    if (newOption.name.trim().length > 0) {
      this.setState({
        options: this.state.options.concat([ newOption ])
      });
    }
  }

  _onToggleEntry() {
    this.setState({
      entryToggle: !this.state.entryToggle
    });
  }

  // store new poll in db
  _submitNewPoll() {
    // UI action feedback
    this.setState({ disabled: true });
    this.props.setLoading(true);
    // Submitting data
    this.props.pollStore.save({
      title: this.refs.title.getValue(),
      subtitle: '', //this.refs.subtitle.getValue(),
      allowNewEntries: this.state.entryToggle,
      options: this.state.options.map((opt) => { return opt.name; })
    }, (err, poll) => {
      this.props.setLoading(false);
      if (err) {
        alert('Error: ' + JSON.stringify(err));
      } else {
        console.log('=> log', poll);
        this.props.history.push('/' + poll.objectId); // redirects to poll URL
        // TODO: display banner/toaster for sharing the poll URL
      }
    });
  }

};

CreateForm.propTypes = {
  defaultItems: React.PropTypes.array
};

CreateForm.defaultProps = {
  defaultItems: [],
};

module.exports = CreateForm;
