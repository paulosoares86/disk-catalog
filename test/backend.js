var assert = require('assert');
var mongoose = require('mongoose');
var superagent = require('superagent');
var server = require('../backend/bin/www');
var status = require('http-status');

function assertListCount(total, cb) {
    superagent
        .get('http://localhost:3000/disks')
        .end(function(err, res) {
            assert.ifError(err);
            assert.equal(res.status, status.OK);
            console.log(res.body)
            assert.equal(res.body.length, total);
            cb();
        });
}

// TODO: colocar banco backend pra ambiente de teste
describe('/', function() {
    before(function() {
        var mongoose = require('mongoose');
        mongoose.connect('mongodb://localhost/backend', function() {
            console.log('removing data from backend database');
            mongoose.connection.db.dropDatabase();
        });
    });

    it('should create a disk', function(done) {
        superagent
            .post('http://localhost:3000/disks', {
                disk: {
                    name: 'Led Zeppelin',
                    author: 'Led Zeppelin',
                    price: 12.45
                }
            })
            .end(function(err, res) {
                assertListCount(1, done);
            });
    });

    it('should another disk', function(done) {
        superagent
            .post('http://localhost:3000/disks', {
                disk: {
                    name: 'Under the Bridge',
                    author: 'Red Hot Chilli Peppers',
                    price: 42.19
                }
            })
            .end(function(err, res) {
                assertListCount(2, done);
            });
    });

    it('should return a list of disks', function(done) {
        assertListCount(2, done);
    });
})
