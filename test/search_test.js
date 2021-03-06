var assert = require('assert');
var Disk = require('../backend/model/disk');
var server = require('../backend/bin/www');
var disks = require('./fixtures/disks.json')

describe('Search', function() {
    before(function(done) {
        Disk.all(1, function(err, data) {
            if (data && data.disks.length > 0) Disk.removeAll();
            var disk1 = new Disk(disks.first);
            disk1.save(function(err) {
                assert.ifError(err);
                var disk2 = new Disk(disks.second);
                disk2.save(function(err) {
                    assert.ifError(err);
                    done();
                })
            })
        });
    });

    it('should wait ElasticSearch index documents', function(done) {
        setTimeout(done, 1000);
    });

    it('should find one created disk', function(done) {
        Disk.search({
            query: 'bridge'
        }, function(err, data) {
            assert.ifError(err);
            assert.equal(data.page, 1);
            assert.equal(data.pages, 1);
            assert.equal(data.disks.length, 1);
            assert.equal(data.disks[0].name, 'Under the Bridge');
            done();
        });
    });

    it('should find the other created disk', function(done) {
        Disk.search({
            query: 'Led Zeppelin'
        }, function(err, data) {
            assert.ifError(err);
            assert.equal(data.disks.length, 1);
            assert.equal(data.disks[0].name, 'Led Zeppelin');
            done();
        });
    });

    it('should find two created disks', function(done) {
        Disk.search({
            query: 'text describes'
        }, function(err, data) {
            assert.ifError(err);
            assert.equal(data.disks.length, 2);
            done();
        });
    });
});
