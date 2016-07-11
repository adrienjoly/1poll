import DocumentTitle from 'react-document-title';

'use strict';

var React = require('react');
var Paper = require('material-ui/lib/paper');
var TextField = require('material-ui/lib/text-field');
var RaisedButton = require('material-ui/lib/raised-button');
var injectTapEventPlugin = require('react-tap-event-plugin');
var Poll = require('react-1poll');

// Needed for onTouchTap
// Can go away when react 1.0 release, cf https://github.com/zilverline/react-tap-event-plugin
// injectTapEventPlugin();

class ViewForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      options: [],
      disableSubmit: true,
      disabled: false, // when true, prevents form from being submitted
      poll: { allowNewEntries: false }, // poll object fetched from the database: title, subtitle, options...
      done: false // when true, the user can not vote again
    };
    this._populate = this._populate.bind(this);
    this._onNewOption = this._onNewOption.bind(this);
    this._onSelectionChange = this._onSelectionChange.bind(this);
    this._submitVote = this._submitVote.bind(this);
  }

  _populate() {
    this.props.pollStore.fetch(this.props.id, (err, poll) => {
      console.log('fetch =>', err, poll);
      if (err) {
        alert('We cannot find this poll, sorry...');
        this.props.history.push('/'); // redirects to home page
      } else {
        this.setState({
          poll: poll,
          options: poll.options
        });
      }
    });
  }

  componentWillMount() {
    this._populate();
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps != this.props || nextState != this.state;
  }

  componentDidUpdate() {
    this.props.onUpdate && this.props.onUpdate.call(this, arguments);
  }

  render() {
    return (
    <DocumentTitle title={(this.state.poll.title || '( loading )') + ' - 1poll'}>
      <form action="#">
        <div className="row">
          <div className="user-signup__intro">
            <p
              style={{ fontSize: '22px', textAlign: 'center', color: 'white', margin: '20px 0', width: '100%' }}
            >{this.state.poll.title}</p>
            <p
              style={{ fontSize: '14px', textAlign: 'center', color: 'white', margin: '20px 0', width: '100%' }}
            >{this.state.poll.subtitle}</p>
          </div>
        </div>
        <div className="row">
          <div className='react-poll-form'>
            <Paper style={{ padding: '16px', paddingTop: '1px', color: '#333' }}>
              <Poll
                disabled={this.state.disabled || this.props.disabled}
                options={this.state.options}
                allowNewEntries={this.state.poll.allowNewEntries && !this.state.done}
                onNewOption={this._onNewOption}
                onSelectionChange={this._onSelectionChange}
                labelStyle={{ color: 'auto' }}
              />
              <RaisedButton
                disabled={this.state.disabled || this.props.disabled || this.state.disableSubmit}
                label={this.state.done ? 'Thank you! :-)' : 'Vote'}
                primary={true}
                backgroundColor='#00a651'
                style={{
                  display: 'block', // to fill the parent div's width
                  marginTop: '16px'
                }}
                onTouchTap={this.state.done ? null : this._submitVote}
              />
            </Paper>
          </div>
        </div>
        <div className="row">
            <p style={{ fontSize: '12px', textAlign: 'center', margin: '40px 0', width: '100%' }}>
              <a style={{ color: '#ccc !important' }} href="/">
                Create your own poll in one click!
              </a>
            </p>
        </div>
      </form>
    </DocumentTitle>
    );
  }

  _onNewOption(newOption) {
    newOption.defaultChecked = false;
    this.setState({
      options: this.state.options.concat([ newOption ])
    }); 
  }

  _onSelectionChange(checkedOptions) {    
    if (this.state.disableSubmit != checkedOptions.length == 0) {
      this.setState({
        disableSubmit: checkedOptions.length == 0
      });
    }
  }

  // store vote in db
  _submitVote() {
    // UI action feedback
    this.setState({ disabled: true });
    this.props.setLoading(true);
    // Submitting data
    this.props.pollStore.vote(this.state.poll.objectId, {
      votes: this.state.options
        .filter((opt) => opt.checked)
        .map((opt) => { return opt.name; })
    }, (err) => {
      this.props.setLoading(false);
      if (err) {
        alert('Error: ' + JSON.stringify(err));
      } else {
        this.setState({ done: true });
        this._populate(); // refresh vote counters
        // TODO: display a nice banner/toaster for sharing the poll URL
      }
    });
  }

};

ViewForm.defaultProps = {
  id: undefined,
  onUpdate: undefined,
  pollStore: undefined,
  disabled: false
};

module.exports = ViewForm;
