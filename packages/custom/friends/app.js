'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Friends = new Module('friends');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Friends.register(function(app, auth, database) {

  //We enable routing. By default the Package Object is passed to the routes
  Friends.routes(app, auth, database);

  //We are adding a link to the main menu for all authenticated users
  Friends.menus.add({
    title: 'friends',
    link: 'friends',
    roles: ['authenticated'],
    class: 'friends',
    menu: 'main'
  });
  Friends.menus.add({
    title: 'notifications',
    link: 'notifications',
    roles: ['authenticated'],
    class: 'notifications',
    menu: 'main'
  });

  Friends.aggregateAsset('css', 'friends.css');

  /**
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    Friends.settings({
        'someSetting': 'some value'
    }, function(err, settings) {
        //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    Friends.settings({
        'anotherSettings': 'some value'
    });

    // Get settings. Retrieves latest saved settigns
    Friends.settings(function(err, settings) {
        //you now have the settings object
    });
    */

  return Friends;
});
