var assert = require('assert');
var superagent = require('superagent');
var server = require('../backend/bin/www');
var status = require('http-status');

describe('/', function() {
  it('should return a list of disks', function(done) {
    superagent
      .get('http://localhost:3000/disks')
      .end(function(err, res) {
        assert.ifError(err);
        assert.equal(res.status, status.OK);
        var result = JSON.parse(res.body);
        assert.deepEqual({ user: 'test' }, result);
        done();
      });
  });
})
