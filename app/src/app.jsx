(function(){
  'use strict';
  
  var React = require('react');
  var ReactDOM = require('react-dom');
  var CreateForm = require('./CreateForm.jsx');

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

  // merges selected items into one field before mailchimp form submission
  function submit(formData) {
    setLoading(true);
    console.log('form data:', formData);
    //itemStore.storeNewPoll(formData) // TODO
    return;
    // AJAX code for testing with devtools' network tab:
    var xhr = new XMLHttpRequest;
    xhr.open('POST', '/', true);
    xhr.send(new FormData(form));
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
