import DocumentTitle from 'react-document-title';

'use strict';

var React = require('react');
var TextField = require('material-ui/lib/text-field');
var PollForm = require('./PollForm.jsx');

class ViewForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      disabled: false, // when true, prevents form from being submitted
      poll: {}, // poll object fetched from the database: title, subtitle, options...
      done: false // when true, the user can not vote again
    };
    this._populate = this._populate.bind(this);
    this._submitVote = this._submitVote.bind(this);
  }

  _populate() {
    this.props.pollStore.fetch(this.props.id, (err, poll) => {
      console.log('fetch =>', err, poll);
      if (err) {
        alert('We cannot find this poll, sorry...');
        this.props.history.push('/'); // redirects to home page
      } else {
        this.setState({ poll: poll });
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
              ref='title'
              style={{ fontSize: '22px', textAlign: 'center', color: 'white', margin: '20px 0', width: '100%' }}
            >{this.state.poll.title}</p>
            <p
              ref='subtitle'
              style={{ fontSize: '14px', textAlign: 'center', color: 'white', margin: '20px 0', width: '100%' }}
            >{this.state.poll.subtitle}</p>
          </div>
        </div>
        <div className="row">
          <PollForm
            ref='pollForm'
            disabled={this.state.disabled || this.props.disabled}
            options={this.state.poll.options}
            callToAction={this.state.done ? 'Thank you! :-)' : 'Vote'}
            onValidSubmit={this.state.done ? null : this._submitVote} />
        </div>
      </form>
    </DocumentTitle>
    );
  }

  // store vote in db
  _submitVote() {
    // UI action feedback
    this.setState({ disabled: true });
    this.props.setLoading(true);
    // Submitting data
    this.props.pollStore.vote(this.state.poll.objectId, {
      votes: this.refs.pollForm.getOptions()
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
