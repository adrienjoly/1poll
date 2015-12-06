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

  return {
    save: save
  };

})();
