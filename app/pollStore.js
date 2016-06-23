//var _ = require("lodash");
var firebase = require("firebase");

module.exports = (function() {

  var inProd = window.location.href.indexOf('http://localhost:') == -1;

  // Initialize Firebase
  firebase.initializeApp({
    apiKey: "AIzaSyCBOU-8RLKzGlMnbuOMREAut34VcW4M8Zw",
    authDomain: "poll-edd8e.firebaseapp.com",
    databaseURL: "https://poll-edd8e.firebaseio.com",
    storageBucket: "poll-edd8e.appspot.com",
  });

  var polls = firebase.database().ref('polls');

  function render(obj) {
    //console.log('render obj:', obj);
    if (!obj) return;
    var data = obj.val();
    //console.log('render obj data:', data);
    return {
      objectId: obj.key,
      title: data.title,
      subtitle: data.subtitle,
      options: data.options.map((opt) => {
        return {
          name: opt.name + (opt.votes ? ' (' + opt.votes + ' votes)' : ''), // TODO: find a nicer way to display votes
          votes: opt.votes
        };
      })
    };
  }

  function cleanOptionName(opt) {
    // TODO: find a nicer way to display votes => this function should not exist
    var [ suffix, nbVotes ] = / \((\d+) votes?\)/.exec(opt) || [];
    return opt.split(suffix)[0];
  }

  function serialize(objFromUi) {
    return {
      title: objFromUi.title,
      subtitle: objFromUi.subtitle,
      options: objFromUi.options.map((opt) => {
        return {
          name : cleanOptionName(opt)
        };
      })
    };
  }

  function fetch(id, cb) {
    //console.log('fetch', id);
    polls.child(id).once('value').then((poll) => {
      //console.log('fetch', id, '->', arguments);
      cb(null, render(poll));
    }, cb);
  }

  function save(pollData, cb) {
    //console.log('storing poll:', pollData);
    var poll = polls.push();
    poll.set(serialize(pollData), function(err){
      //console.log('save -> set', arguments);
      if (err) cb(err);
      else fetch(poll.key, cb);
    });
  }
  
  function vote(id, voteObj) {
    console.log('voting for poll options:', id, voteObj);
    // 1) convert votes into a set
    var votes = {};
    for (var i in voteObj.votes) votes[cleanOptionName(voteObj.votes[i])] = 1;
    // 2) increment votes in db
    polls.child(id).child('options').transaction(function(pollOptions) {
      console.log('transaction =>', arguments);
      if (pollOptions === null) return pollOptions; // not ready => firebase will retry
      return pollOptions.map((opt) => {
        return {
          name: opt.name,
          votes: (opt.votes || 0) + (votes[opt.name] || 0)
        };
      });
    }, function(err, committed, snapshot) {
      console.log('vote() =>', arguments);
      alert(committed ? 'Your vote was taken into account, thank you! :-)' : 'Oops, an error occured... Please try again!');
      // TODO: callback ?
    });
  }

  return {
    vote: vote,
    fetch: fetch,
    save: save
  };

})();
