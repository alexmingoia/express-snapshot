var assert = require('assert');
var snapshot = require('..');

describe('module', function () {
  it('exports snapshot', function () {
    assert.equal('function', typeof snapshot);
  });
});
