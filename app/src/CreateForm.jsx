'use strict';

var React = require('react');
var TextField = require('material-ui/lib/text-field');
var PollForm = require('./PollForm.jsx');

class CreateForm extends React.Component {

  static defaultProps: {
    defaultItems: [],
  };

  constructor(props) {
    super(props);
    this.state = {
      disabled: false
    };
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
            <TextField
              ref='title'
              name='title'
              disabled={this.state.disabled}
              hintText='Enter a title for your poll'
              hintStyle={{ color: '#999' }}
              inputStyle={{ textAlign: 'center', color: 'white' }}
              style={{ fontSize: '22px', margin: '20px 0', width: '100%' }}
            />
            <TextField
              ref='subtitle'
              name='subtitle'
              disabled={this.state.disabled}
              hintText='Enter a description / call to action (optional)'
              hintStyle={{ color: '#999' }}
              inputStyle={{ textAlign: 'center', color: 'white' }}
              style={{ fontSize: '14px', margin: '20px 0', width: '100%' }}
            />
          </div>
        </div>
        <div className="row">
          <PollForm
            ref='pollForm'
            disabled={this.state.disabled}
            options={this.props.defaultItems}
            onValidSubmit={this.onValidSubmit} />
        </div>
      </form>
    );
  }

  onValidSubmit = () => {
    // UI action feedback
    this.setState({ disabled: true });
    // Submitting data
    this.props.onSubmit({
      title: this.refs.title.getValue(),
      subtitle: this.refs.subtitle.getValue(),
      options: this.refs.pollForm.getOptions()
    });
  }

};

module.exports = CreateForm;
