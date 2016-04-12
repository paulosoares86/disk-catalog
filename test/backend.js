var assert = require('assert');
var superagent = require('superagent');
var server = require('../backend/bin/www');
var status = require('http-status');

function assertListCount(total, cb) {
  superagent
    .get('http://localhost:3000/disks')
    .end(function(err, res) {
      assert.ifError(err);
      assert.equal(res.status, status.OK);
      assert.equal(res.body.disks.length, total);
      cb();
    });
}

describe('/', function() {
  it('should return a list of disks', function(done) {
    assertListCount(2, done);
  });

  it('should create a disk', function(done) {
    superagent
      .get('http://localhost:3000/disks', {disk: {name: 'Soh para baixinhos', author: 'Xuxa'}})
      .end(function(err, res) {
        assertListCount(3, done);
      });
  });
})
