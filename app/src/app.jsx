import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link } from 'react-router';
import { createHashHistory } from 'history';

import ViewForm from './ViewForm.jsx';
import CreateForm from './CreateForm.jsx';

import pollStore from './pollStore.js';


(function(){
  'use strict';
  
  // Needed for React Developer Tools
  window.React = React;

  var appDiv = document.getElementById('app');

  // animates the height of the options list
  function heightTransition() {
    setTimeout(function() {
      appDiv.style.maxHeight = appDiv.childNodes[0].clientHeight + 'px';
    });
    setTimeout(function() {
      appDiv.style.maxHeight = 'none';
    }, 1000);
  }

  // displays the loading animation if toggle == true
  function setLoading(toggle) {
    document.body.className = (document.body.className || '').replace(/is\-loading/, '');
    if (toggle) {
      document.body.className += ' is-loading';
    }
  }

  // store new poll in db
  function submitNewPoll(formData) {
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

  function submitVote() {
    console.log('submitvote', arguments);
  }

  var CreatePage = React.createClass({
    render: function() {
      return (
        <CreateForm
          onSubmit={submitNewPoll}
          onUpdate={heightTransition}
        />
      );
    }
  });

  var ViewPage = React.createClass({
    getInitialState: function() {
      return { poll: {} };
    },
    componentWillMount: function() {
      pollStore.fetch(this.props.params.id, (err, poll) => {
        console.log('fetch =>', err, poll);
        this.setState({ poll: poll });
      });
    },
    render: function() {
      return (
        <ViewForm
          title={this.state.poll.title}
          subtitle={this.state.poll.subtitle}
          defaultItems={this.state.poll.options} // { name: 'id: ' + this.props.params.id }
          onSubmit={submitVote}
          onUpdate={heightTransition}
        />
      );
    }
  });

  var UnknownPage = React.createClass({
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
      <Route path='/:id' component={ViewPage}/>
      <Route path='*' component={UnknownPage}/>
    </Router>
  );

  ReactDOM.render(router, appDiv);

})();
