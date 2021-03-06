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
      allowNewEntries: !!data.allowNewEntries,
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
      allowNewEntries: !!objFromUi.allowNewEntries,
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
  
  function vote(id, voteObj, cb) {
    console.log('voting for poll options:', id, voteObj);
    polls.child(id).child('options').transaction(function(pollOptions) {
      console.log('transaction =>', arguments);
      if (pollOptions === null) return pollOptions; // not ready => firebase will retry
      // 1) clean voted options
      var votedOptions = voteObj.votes.map(cleanOptionName);
      // 2) index db options by name
      var optIndexByName = {};
      for (var i in pollOptions) optIndexByName[pollOptions[i].name] = i;
      // 3) update options array with incremented vote counters, and new options
      votedOptions.forEach((name) => {
        var index = optIndexByName[name];
        if (index === undefined) {
          pollOptions.push({
            name: name,
            votes: 1
          });
        } else {
          pollOptions[index].votes = (pollOptions[index].votes || 0) + 1;
        }
      });
      return pollOptions;
    }, function(err, committed, snapshot) {
      console.log('vote() =>', arguments);
      cb(err);
    });
  }

  return {
    vote: vote,
    fetch: fetch,
    save: save
  };

})();
