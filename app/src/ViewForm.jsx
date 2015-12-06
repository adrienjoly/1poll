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
      this.setState({ poll: poll });
      // TODO: display message on error
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
            onValidSubmit={this._submitVote} />
        </div>
      </form>
    );
  }

  _submitVote = function () {
    console.log('submitvote', arguments);
  }

};

module.exports = ViewForm;
