import ReactDOM from 'react-dom';
import DocumentTitle from 'react-document-title';

'use strict';

var React = require('react');
var TextField = require('material-ui/lib/text-field');
var PollForm = require('./PollForm.jsx');

class CreateForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      disabled: false
    };
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
              hintText='Enter a title for your poll'
              hintStyle={{ color: '#999' }}
              inputStyle={{ textAlign: 'center', color: 'white' }}
              underlineStyle={{ borderColor: 'transparent' }}
              underlineFocusStyle={{ borderColor: '#999' }}
              style={{ fontSize: '22px', width: '100%' }}
            />
            <TextField
              ref='subtitle'
              disabled={this.state.disabled}
              hintText='Enter a description / call to action (optional)'
              hintStyle={{ color: '#999' }}
              inputStyle={{ textAlign: 'center', color: 'white' }}
              underlineStyle={{ borderColor: 'transparent' }}
              underlineFocusStyle={{ borderColor: '#999' }}
              style={{ fontSize: '14px', marginBottom: '20px', width: '100%' }}
            />
          </div>
        </div>
        <div className="row">
          <PollForm
            ref='pollForm'
            disabled={this.state.disabled}
            options={this.props.defaultItems}
            callToAction='Publish'
            onValidSubmit={this._submitNewPoll} />
        </div>
      </form>
    </DocumentTitle>
    );
  }

  // store new poll in db
  _submitNewPoll() {
    // UI action feedback
    this.setState({ disabled: true });
    this.props.setLoading(true);
    // Submitting data
    this.props.pollStore.save({
      title: this.refs.title.getValue(),
      subtitle: this.refs.subtitle.getValue(),
      options: this.refs.pollForm.getOptions().map((opt) => { return opt.name; })
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
