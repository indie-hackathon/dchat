'use strict';

// The Package is past automatically as first parameter
module.exports = function(Draw, app, auth, database) {

  app.get('/draw/example/anyone', function(req, res, next) {
    res.send('Anyone can access this');
  });

  app.get('/draw/example/auth', auth.requiresLogin, function(req, res, next) {
    res.send('Only authenticated users can access this');
  });

  app.get('/draw/example/admin', auth.requiresAdmin, function(req, res, next) {
    res.send('Only users with Admin role can access this');
  });

  app.get('/draw/example/render', function(req, res, next) {
    Draw.render('index', {
      package: 'draw'
    }, function(err, html) {
      //Rendering a view from the Package server/views
      res.send(html);
    });
  });
};
