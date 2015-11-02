(function(){
  'use strict';
  // inpired by: https://github.com/callemall/material-ui/blob/master/examples/webpack-example/src/app/app.jsx
  
  var React = require('react');
  var ReactDOM = require('react-dom');
  var injectTapEventPlugin = require('react-tap-event-plugin');
  var Poll = require('./1poll-react-component.js');

  // Needed for React Developer Tools
  window.React = React;

  // Needed for onTouchTap
  // Can go away when react 1.0 release, cf https://github.com/zilverline/react-tap-event-plugin
  injectTapEventPlugin();

  var appDiv = document.getElementById('app');

  var props = {
    options: [
      { name: 'monday, after school' },
      { name: 'tuesday, before "the arrival"' },
      { name: '\'<happy-hours> wednesday\'' }
    ],
    onSubmit: function(evt) {
      // Create a event that can be handled from outside of the react component
      var myEvent = document.createEventObject ?
        document.createEventObject() :
        document.createEvent("Events");
      myEvent.initEvent('submit', true, true);
      var targetElement = appDiv;
      targetElement.dispatchEvent ?
        targetElement.dispatchEvent(myEvent) :
        targetElement.fireEvent('onSubmit', myEvent);
    }
  };

  // Render the main app react component into the app div.
  // For more details see: https://facebook.github.io/react/docs/top-level-api.html#react.render
  ReactDOM.render(React.createElement(Poll, props), appDiv);

})();
