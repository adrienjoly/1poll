module.exports = (function() {
  
  Parse.initialize('EW02RQhhvjE3B58YDgbo87dqRWYCiJeZyusD8ll7', 'UTu46JdJfO7VrD30GkmMJHAL5TgqQysLgh24JZlf');
  var Poll = Parse.Object.extend('Poll');

  function render(obj) {
    return obj && {
      objectId: obj.id,
      title: obj.get('title'),
      subtitle: obj.get('subtitle'),
      options: obj.get('options').map((opt) => {
        return { name: opt };
      })
    };
  }

  function fetch(id, cb) {
    var query = new Parse.Query(Poll);
    query.get(id, {
      success: (obj) => { cb(null, render(obj)); },
      error: (obj, err) => { cb(err, render(obj)); }
    });
  }

  function save(pollData, cb) {
    console.log('storing poll:', pollData);
    (new Poll()).save(pollData, {
      success: (obj) => { cb(null, render(obj)); },
      error: (obj, err) => { cb(err, render(obj)); }
    });
  }
  
  function vote(pollId, voteObj) {
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
  }

  return {
    vote: vote,
    fetch: fetch,
    save: save
  };

})();
