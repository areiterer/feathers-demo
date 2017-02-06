'use strict';

const globalHooks = require('../../../hooks');
const hooks = require('feathers-hooks');

exports.before = {
  all: [
    // We want to disable any outside access to our transport
    hooks.disable('external')
  ],
  find: [],
  get: [],
  create: [],
  update: [],
  patch: [],
  remove: []
};

exports.after = {
  all: [],
  find: [],
  get: [],
  create: [],
  update: [],
  patch: [],
  remove: []
};
