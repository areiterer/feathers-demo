'use strict';

const globalHooks = require('../../../hooks');
const hooks = require('feathers-hooks');
const auth = require('feathers-authentication').hooks;
const common = require('feathers-hooks-common');

const isAction = (...args) => hook => args.includes(hook.data.action);

exports.before = {
  all: [],
  find: [],
  get: [],
  create: [
    //using feathers-hooks-common to conditionally require
    common.iff(isAction('passwordChange', 'identityChange'),
      auth.verifyToken(),
      auth.populateUser(),
      auth.restrictToAuthenticated()
    ),
  ],
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
