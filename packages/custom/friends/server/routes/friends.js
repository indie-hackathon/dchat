'use strict';

// The Package is past automatically as first parameter
var friends = require('../controllers/friends');

module.exports = function(Friends, app, auth, database) {

  app.route('/friends')
    .get(friends.all)
    .post(friends.add);
};
