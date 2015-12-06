'use strict';

var React = require('react');
var TextField = require('material-ui/lib/text-field');
var PollForm = require('./PollForm.jsx');

class ViewForm extends React.Component {

  static defaultProps: {
    defaultItems: [],
  };

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
            >{this.props.title}</p>
            <p
              ref='subtitle'
              style={{ fontSize: '14px', textAlign: 'center', color: 'white', margin: '20px 0', width: '100%' }}
            >{this.props.subtitle}</p>
          </div>
        </div>
        <div className="row">
          <PollForm
            ref='pollForm'
            disabled={this.props.disabled}
            options={this.props.defaultItems}
            onValidSubmit={this.props.onSubmit} />
        </div>
      </form>
    );
  }

};

module.exports = ViewForm;
