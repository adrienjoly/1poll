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
      options: this.props.defaultItems
    };
  }

  shouldComponentUpdate = (nextProps, nextState) => {
    return nextProps != this.props || nextState.options.disabled !== this.state.options.disabled;
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
              hintText='Enter a title for your poll (hint)'
              errorText='Enter a title for your poll (error)'
              errorStyle={{color: 'gray'}}
              style={this.props.style || { textAlign: 'center', margin: '20px 0' }}
              //disabled={this.props.disabled} // TODO
            />
            <p style={{ textAlign: 'center' }}>
              <span style={{ fontSize: '14px' }}>Please tick the dates that are convenient for you, or add more below:</span>
            </p>
          </div>
        </div>
        <div className="row">
          <PollForm
            ref='pollForm'
            //disabled={this.props.disabled} // TODO
            options={this.state.options}
            onNewOption={this.onNewOption}
            onValidSubmit={this.onValidSubmit} />
        </div>
      </form>
    );
  }

  onNewOption = (newOption) => {
    this.setState({
      options: this.state.options.concat([ newOption ])
    });
  }

  onValidSubmit = () => {
    // UI action feedback
    this.setState({ disabled: true });
    // Submitting data
    this.props.onSubmit({
      title: this.refs.title.getValue(),
    });
  }

};

module.exports = CreateForm;
