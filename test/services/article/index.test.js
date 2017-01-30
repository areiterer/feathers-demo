'use strict';

const assert = require('assert');
const app = require('../../../src/app');

describe('article service', function() {
  it('registered the articles service', () => {
    assert.ok(app.service('articles'));
  });
});
