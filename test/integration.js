var assert = require('assert');
var mongoose = require('mongoose');
var superagent = require('superagent');
var server = require('../backend/bin/www');
var status = require('http-status');
var disks = require('./factories/disks.json')

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
        })
}

describe('/', function() {
    before(function() {
        var mongoose = require('mongoose');
        mongoose.connect('mongodb://localhost/backend', function() {
            mongoose.connection.db.dropDatabase();
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

    it('should another disk', function(done) {
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
        getFirstObjectFromList(function(obj) {
            superagent
                .del('http://localhost:3000/disks/' + obj._id)
                .end(function(err, res) {
                    assertListCount(1, done);
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


    it('should receive validation errors', function(done) {
        superagent
            .post('http://localhost:3000/disks', {
                disk: disks.withoutName
            })
            .end(function(err, res) {
                assert.equal(res.status, status.BAD_REQUEST);
                assert.deepEqual(res.body, {error: ['Name is required!']});
                done();
            });
    });
})
