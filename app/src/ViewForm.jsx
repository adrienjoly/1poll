import DocumentTitle from 'react-document-title';

'use strict';

var React = require('react');
var TextField = require('material-ui/lib/text-field');
var PollForm = require('./PollForm.jsx');

class ViewForm extends React.Component {

  static defaultProps: {
    id: undefined,
    onUpdate: undefined,
    pollStore: undefined,
    disabled: false
  };

  state = {
    poll: {}
  };

  componentWillMount = function() {
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

  shouldComponentUpdate = (nextProps, nextState) => {
    return nextProps != this.props || nextState != this.state;
  }

  componentDidUpdate = () => {
    this.props.onUpdate && this.props.onUpdate.call(this, arguments);
  }

  render = () => {
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
            disabled={this.props.disabled}
            options={this.state.poll.options}
            callToAction='Vote'
            onValidSubmit={this._submitVote} />
        </div>
      </form>
    </DocumentTitle>
    );
  }

  // store vote in db
  _submitVote = () => {
    // UI action feedback
    this.setState({ disabled: true });
    this.props.setLoading(true);
    // Submitting data
    this.props.pollStore.vote(this.state.poll.objectId, {
      votes: this.refs.pollForm.getOptions().map((opt) => { return opt.name; })
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

module.exports = ViewForm;
