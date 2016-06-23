var firebase = require("firebase");
//require("firebase/app");
//require("firebase/auth");
//require("firebase/database");
module.exports = (function() {

  var inProd = window.location.href.indexOf('http://localhost:') == -1;

  // Initialize Firebase
  firebase.initializeApp({
    apiKey: "AIzaSyCBOU-8RLKzGlMnbuOMREAut34VcW4M8Zw",
    authDomain: "poll-edd8e.firebaseapp.com",
    databaseURL: "https://poll-edd8e.firebaseio.com",
    storageBucket: "poll-edd8e.appspot.com",
  });

  var polls = firebase.database().ref().child('polls');

  function render(obj) {
    console.log('render obj:', obj);
    if (!obj) return;
    var data = obj.val();
    console.log('render obj data:', data);
    return {
      objectId: obj.key,
      title: data.title,
      subtitle: data.subtitle,
      options: data.options.map((opt) => {
        return { name: opt };
      })
    };
  }

  function fetch(id, cb) {
    console.log('fetch', id);
    firebase.database().ref('polls/' + id).once('value').then((poll) => {
      console.log('fetch', id, '->', arguments);
      cb(null, render(poll));
    }, cb);
  }

  function save(pollData, cb) {
    console.log('storing poll:', pollData);
    var poll = polls.push();
    poll.set(pollData, function(err){
      console.log('save -> set', arguments);
      fetch(poll.key, cb);
      //cb(err, !err && render(poll));
    });
  }
  
  function vote(pollId, voteObj) {
    return;
    /*
    console.log('voting for poll options:', pollId, voteObj);
    var query = new Parse.Query(Poll);
    query.get(pollId).then(function(poll) {
      console.log('remote poll obj:', poll);
      return;
      for (var i in voteObj) {
        // TODO
        poll.increment("reviews");
      }
      poll.save();
    }, function(error) {
      console.error(error);
      alert('There was a problem while saving your vote, sorry...');
      throw "Got an error " + error.code + " : " + error.message;
    });
    */
  }

  return {
    vote: vote,
    fetch: fetch,
    save: save
  };

})();
