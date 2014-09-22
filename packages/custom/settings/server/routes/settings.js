'use strict';

// The Package is past automatically as first parameter
module.exports = function(Settings, app, auth, database) {

  app.get('/settings/example/anyone', function(req, res, next) {
    res.send('Anyone can access this');
  });

  app.get('/settings/example/auth', auth.requiresLogin, function(req, res, next) {
    res.send('Only authenticated users can access this');
  });

  app.get('/settings/example/admin', auth.requiresAdmin, function(req, res, next) {
    res.send('Only users with Admin role can access this');
  });

  app.get('/settings/example/render', function(req, res, next) {
    Settings.render('index', {
      package: 'settings'
    }, function(err, html) {
      //Rendering a view from the Package server/views
      res.send(html);
    });
  });
};
