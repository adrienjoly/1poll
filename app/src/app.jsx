import { Router, Route, Link } from 'react-router';
import { createHashHistory } from 'history';

(function(){
  'use strict';
  
  var React = require('react');
  var ReactDOM = require('react-dom');
  var CreateForm = require('./CreateForm.jsx');
  var pollStore = require('./pollStore.js');

  // Needed for React Developer Tools
  window.React = React;

  var DEFAULT_ITEMS = [ /* { name: 'Option 1' } */ ];

  // displays the loading animation if toggle == true
  function setLoading(toggle) {
    document.body.className = (document.body.className || '').replace(/is\-loading/, '');
    if (toggle) {
      document.body.className += ' is-loading';
    }
  }

  // store new poll in db
  function submit(formData) {
    setLoading(true);
    pollStore.save({
      title: formData.title,
      subtitle: formData.subtitle,
      options: formData.options.map((opt) => { return opt.name; })
    }, function(err, result) {
      setLoading(false);
      if (err) {
        alert('Error: ' + JSON.stringify(err));
      } else {
        alert('TODO: display poll + link to share');
      }
    });
  };

  // ___
  // Main logic

  var appDiv = document.getElementById('app');

  function heightTransition() {
    setTimeout(function() {
      appDiv.style.maxHeight = appDiv.childNodes[0].clientHeight + 'px';
    });
    setTimeout(function() {
      appDiv.style.maxHeight = 'none';
    }, 1000);
  }

  var CreatePage = React.createClass({
    render: function() {
      return (
        <CreateForm
          onSubmit={submit}
          onUpdate={heightTransition}
        />
      );
    }
  });

  var PollPage = React.createClass({
    render: function() {
      return (
        <CreateForm
          defaultItems={[{ name: 'coucou' + this.props.params.id }]}
          onSubmit={submit}
          onUpdate={heightTransition}
        />
      );
    }
  });

  var Unknown = React.createClass({
    render: function() {
      return (
        <p>unknown route</p>
      );
    }
  });

  var history = createHashHistory({
    queryKey: false // removes state hashes, cf https://github.com/rackt/react-router/blob/master/docs/guides/basics/Histories.md#what-is-that-_kckuvup-junk-in-the-url
  });

  var router = (
    <Router history={history}>
      <Route path='/' component={CreatePage}/>
      <Route path='/:id' component={PollPage}/>
      <Route path='*' component={Unknown}/>
    </Router>
  );

  ReactDOM.render(router, appDiv);

})();
