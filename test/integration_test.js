var assert = require('assert');
var Disk = require('../backend/model/disk');
var superagent = require('superagent');
var server = require('../backend/bin/www');
var status = require('http-status');
var disks = require('./fixtures/disks.json')

function assertListCount(total, cb) {
    superagent
        .get('http://localhost:3000/disks')
        .end(function(err, res) {
            assert.ifError(err);
            assert.equal(res.status, status.OK);
            assert.equal(res.body.length, total);
            cb();
        });
}

function getFirstObjectFromList(cb) {
    superagent
        .get('http://localhost:3000/disks')
        .end(function(err, res) {
            assert.ifError(err);
            assert.equal(res.status, status.OK);
            var firstObject = res.body[0];
            cb(firstObject);
        });
}

describe('Disks Endpoint', function() {
    before(function(done) {
        Disk.all(function(err, data) {
            if (data && data.length > 0) Disk.removeAll();
            done();
        });
    });

    it('should create a disk', function(done) {
        superagent
            .post('http://localhost:3000/disks', {
                disk: disks.first
            })
            .end(function(err, res) {
                assertListCount(1, done);
            });
    });

    it('should create another disk', function(done) {
        superagent
            .post('http://localhost:3000/disks', {
                disk: disks.second
            })
            .end(function(err, res) {
                assertListCount(2, done);
            });
    });

    it('should return a list of disks', function(done) {
        assertListCount(2, done);
    });

    it('should list disks with all fields', function(done) {
        superagent
            .get('http://localhost:3000/disks')
            .end(function(err, res) {
                assert.ifError(err);
                assert.equal(res.status, status.OK);
                var obj = res.body[0];
                delete obj._id;
                delete obj.__v;
                assert.deepEqual(obj, disks.first);
                done();
            })
    });

    it('should show a disk', function(done) {
        getFirstObjectFromList(function(obj) {
            superagent
                .get('http://localhost:3000/disks/' + obj._id)
                .end(function(err, res) {
                    assert.ifError(err);
                    assert.equal(res.status, status.OK);
                    assert.equal(res.body.name, obj.name);
                    assert.equal(res.body.price, obj.price);
                    done();
                });
        });
    });

    it('should remove a disk', function(done) {
        assertListCount(2, function() {
            getFirstObjectFromList(function(obj) {
                superagent
                    .del('http://localhost:3000/disks/' + obj._id)
                    .end(function(err, res) {
                        assertListCount(1, done);
                    });
            });
        });
    });

    it('should update a disk', function(done) {
        getFirstObjectFromList(function(obj) {
            var newName = 'new album name';
            superagent
                .patch('http://localhost:3000/disks/' + obj._id, {
                    name: newName
                })
                .end(function(err, res) {
                    getFirstObjectFromList(function(obj) {
                        assert.equal(obj.name, newName);
                        done();
                    })
                });
        });
    });

    it('should find the updated album by name', function(done) {
        setTimeout(function() {
            superagent
                .post('http://localhost:3000/disks/search', {
                    name: 'new album name'
                })
                .end(function(err, res) {
                  console.log(res.body)
                    assert.equal(res.body.disks[0].name, 'new album name')
                });
        }, 1000);
    });

    it('should receive validation errors', function(done) {
        superagent
            .post('http://localhost:3000/disks', {
                disk: disks.withoutName
            })
            .end(function(err, res) {
                assert.equal(res.status, status.BAD_REQUEST);
                assert.deepEqual(res.body, {
                    error: ['Name is required!']
                });
                done();
            });
    });
})
