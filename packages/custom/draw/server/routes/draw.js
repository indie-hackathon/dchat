'use strict';

// The Package is past automatically as first parameter
var draws = require('../controllers/draws');

module.exports = function(Draw, app, auth, database) {

  app.route('/draws')
    .get(draws.all)
    .post(draws.create)
    .delete(draws.remove);

  app.route('/draws/:friend')
    .get(draws.list);

  // Finish with setting up the articleId param
  app.param('friend', draws.list);
};
