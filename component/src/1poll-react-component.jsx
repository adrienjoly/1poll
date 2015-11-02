(function(){
  var React = require('react');
  var ReactDOM = require('react-dom');
  var ThemeManager = require('material-ui/lib/styles/theme-manager');
  var RaisedButton = require('material-ui/lib/raised-button');

  //Needed for React Developer Tools
  window.React = React;

  var Main = React.createClass({

    childContextTypes: {
      muiTheme: React.PropTypes.object,
    },

    getInitialState () {
      return {
        muiTheme: ThemeManager.getMuiTheme(LightRawTheme),
      };
    },

    getChildContext() {
      return {
        muiTheme: this.state.muiTheme,
      };
    },

    componentWillMount() {
      let newMuiTheme = ThemeManager.modifyRawThemePalette(this.state.muiTheme, {
        accent1Color: Colors.deepOrange500,
      });
      
      this.setState({muiTheme: newMuiTheme});
    },

    render() {

      let containerStyle = {
        textAlign: 'center',
        paddingTop: '200px',
      };

      let standardActions = [
        { text: 'Okay' },
      ];

      return (
        <div style={containerStyle}>
          <h1>material-ui</h1>
          <h2>example project</h2>
          <RaisedButton label="Super Secret Password" primary={true} onTouchTap={this._handleTouchTap} />
        </div>
      );
    },

    _handleTouchTap() {
      alert('touché');
    },

  });
  //module.exports = Main;

  // Render the main app react component into the app div.
  // For more details see: https://facebook.github.io/react/docs/top-level-api.html#react.render
  ReactDOM.render(<Main />, document.getElementById('app'));

  console.log('1poll-react-component loaded.');
})();
