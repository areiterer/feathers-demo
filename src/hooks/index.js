'use strict';

const accountService = require('../services/authManagement/notifier');

// Add any common hooks you want to share across services in here.
// 
// Below is an example of how a hook is written and exported. Please
// see http://docs.feathersjs.com/hooks/readme.html for more details
// on hooks.

exports.myHook = function (options) {
  return function (hook) {
    console.log('My custom global hook ran. Feathers is awesome!');
  };
};

exports.sendVerificationEmail = options => hook => {
  if (!hook.params.provider) {
    return hook;
  }

  const user = hook.result;

  if(process.env.MAIL && hook.data && hook.data.email && user) {
    accountService(hook.app).notifier('sendVerifySignup', user);
    return hook;
  }

  return hook;
};