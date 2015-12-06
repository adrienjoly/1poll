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
      console.log('=>', arguments);
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

  var element =
    <CreateForm
      defaultItems={DEFAULT_ITEMS}
      onSubmit={submit}
      onUpdate={heightTransition}
    />;

  return ReactDOM.render(element, appDiv);

})();
