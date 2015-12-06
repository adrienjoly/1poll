module.exports = (function() {
  
  Parse.initialize('EW02RQhhvjE3B58YDgbo87dqRWYCiJeZyusD8ll7', 'UTu46JdJfO7VrD30GkmMJHAL5TgqQysLgh24JZlf');
  var Poll = Parse.Object.extend('Poll');

  function save(pollData, cb) {
    console.log('storing poll:', pollData);
    (new Poll()).save(pollData, {
      success: (poll) => { cb(null, poll); },
      error: (poll, err) => { cb(err, poll); }
    });
  }

  function render(obj) {
    return {
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

  return {
    fetch: fetch,
    save: save
  };

})();
