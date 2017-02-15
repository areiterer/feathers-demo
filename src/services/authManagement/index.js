'use strict';

const authManagement = require('feathers-authentication-management');
const hooks = require('./hooks');
const notifier = require('./notifier');


module.exports = function(){
  const app = this;

  /*
   The feathers-authentication-management library requires options to be passed in
   that will return from our notifier. We make the notifier a function so we can
   pass in the feathers app variable that we can use to call our email service.
   */

  // Initialize our service with any options it requires
  app.configure(authManagement(notifier(app)));

  // Get our initialize service to that we can bind hooks
  const authManagementService = app.service('/authManagement');

  // Set up our before hooks
  authManagementService.before(hooks.before);

  // Set up our after hooks
  authManagementService.after(hooks.after);
};
