'use strict';

const service = require('feathers-mongoose');
const article = require('./article-model');
const hooks = require('./hooks');

module.exports = function() {
  const app = this;

  const options = {
    Model: article,
    paginate: {
      default: 5,
      max: 25
    }
  };

  // Initialize our service with any options it requires
  app.use('/articles', service(options));

  // Get our initialize service to that we can bind hooks
  const articleService = app.service('/articles');

  // Set up our before hooks
  articleService.before(hooks.before);

  // Set up our after hooks
  articleService.after(hooks.after);
};
