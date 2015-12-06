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

  var CreatePage = React.createClass({
    render: function() {
      return (
        <CreateForm
          history={history}
          pollStore={pollStore}
          setLoading={setLoading}
          onUpdate={heightTransition}
        />
      );
    }
  });

  var ViewPage = React.createClass({
    render: function() {
      return (
        <ViewForm
          id={this.props.params.id}
          history={history}
          pollStore={pollStore}
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
