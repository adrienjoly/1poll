'use strict';

var React = require('react');
var TextField = require('material-ui/lib/text-field');
var PollForm = require('./PollForm.jsx');
var itemStore = require('./itemStore.js');

class CreateForm extends React.Component {

  static defaultProps: {
    defaultItems: [],
    //setLoading: null,
    //form: null
  };

  constructor(props) {
    super(props);
    this.state = {
      options: this.props.defaultItems
    };
  }

  componentWillMount = () => {
    /*
    console.log('Fetching options from Parse DB...');
    var _this = this;
    itemStore.fetchItems(function(error, items) {
      _this.props.setLoading(false);
      if (error) {
        console.error('Fetch error:', error);
      } else {
        console.log('=>', items);
        _this.setState({ options: items});
      }
    }, _this.props.defaultItems);
    */
  }

  shouldComponentUpdate = (nextProps, nextState) => {
    return nextProps != this.props || nextState.options != this.state.options;
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
              name='title'
              hintText='Enter a title for your poll (hint)'
              errorText='Enter a title for your poll (error)'
              errorStyle={{color: 'gray'}}
              style={this.props.style || { textAlign: 'center', margin: '20px 0' }}
            />
            <p style={{ textAlign: 'center' }}>
              <span style={{ fontSize: '14px' }}>Please tick the dates that are convenient for you, or add more below:</span>
            </p>
          </div>
        </div>
        <div className="row">
          <PollForm
            ref='pollForm'
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
    this.refs.pollForm.setState({ disabled: true });
    this.props.setLoading(true);
    // submitting data
    console.log('Saving new selected items...');
    var selectedItems = this.refs.pollForm.state.selectedOptions.map((opt) => opt.name);
    console.log('Selected items:', selectedItems);
    itemStore.syncItems(selectedItems, () => {
      console.log('=>', arguments);
      this.props.onSubmit(selectedItems);
    });
  }

};

module.exports = CreateForm;
