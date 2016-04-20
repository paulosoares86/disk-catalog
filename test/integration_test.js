var assert = require('assert');
var Disk = require('../backend/model/disk');
var superagent = require('superagent');
var server = require('../backend/bin/www');
var status = require('http-status');
var disks = require('./fixtures/disks.json');
var config = require('../config/config');
var _ = require('underscore');

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

function getFirstObjectFromList(cb) {
    superagent
        .get('http://localhost:3000/disks')
        .end(function(err, res) {
            assert.ifError(err);
            assert.equal(res.status, status.OK);
            var firstObject = res.body.disks[0];
            cb(firstObject);
        });
}

describe('Disks Endpoint', function() {
    before(function(done) {
        Disk.all(1, function(err, data) {
            if (data && data.disks.length > 0) Disk.removeAll();
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
                var obj = res.body.disks[0];
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
                    assert.equal(res.body.image, obj.image);
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

    it('should update a disk and ignore id', function(done) {
        getFirstObjectFromList(function(obj) {
            var newName = 'new album name';
            superagent
                .patch('http://localhost:3000/disks/' + obj._id, {
                    disk: {
                        name: newName,
                        id: obj._id
                    }
                })
                .end(function(err, res) {
                    assert.ifError(err);
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
                    query: 'new name'
                })
                .end(function(err, res) {
                    assert.equal(res.body.disks[0].name, 'new album name');
                    done();
                });
        }, 1200);
    });

    it('should receive validation errors', function(done) {
        superagent
            .post('http://localhost:3000/disks', {
                disk: disks.withoutName
            })
            .end(function(err, res) {
                assert.equal(res.status, status.BAD_REQUEST);
                assert.deepEqual(res.body, {
                    validationErrors: ['Name is required!'],
                    error: 'Invalid record'
                });
                done();
            });
    });

    it('should return at most the max number of items per page', function(done) {
        var totalDisks = 8 * config.maxResultsPerQuery;
        for (var i = 0; i < totalDisks; i++) {
            var newDisk = _.extend({
                name: 'disk #' + (i + 1).toString()
            }, disks.withoutName);
            superagent.post('http://localhost:3000/disks', {
                disk: newDisk
            }).end(function(err, data) {
                assert.ifError(err);
            });
        }

        setTimeout(function() {
            Disk.search({
                query: 'disk'
            }, function(err, data) {
                assert.ifError(err);
                assert.equal(data.disks.length, config.maxResultsPerQuery);
                assertListCount(config.maxResultsPerQuery, done);
            });

        }, 1000);
    });

    it('should get one item at the last page', function(done) {
        Disk.search({
            query: 'new disk', page: 9
        }, function(err, data) {
            assert.ifError(err);
            assert.equal(data.disks.length, 1);
            superagent
                .get('http://localhost:3000/disks?page=9')
                .end(function(err, res) {
                    assert.ifError(err);
                    assert.equal(res.body.disks.length, 1);
                    done();
                });
        });
    });

    it('should be able to handle 200 customers in 1 seconds with 25 items', function(done) {
        var totalReads = 0;
        var totalUsers = 200;

        for (var i = 0; i < totalUsers; i++) {
            superagent
                .get('http://localhost:3000/disks')
                .end(function(err, res) {
                    assert.ifError(err);
                    totalReads += 1;
                });
        }

        setTimeout(function() {
            assert.equal(totalReads, totalUsers);
            done();
        }, 1000);
    });
})
