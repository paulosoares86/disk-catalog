var assert = require('assert');
var Disk = require('../backend/model/disk');
var disks = require('./fixtures/disks.json');

describe('Disk model', function() {
    it('should be valid when all fields are present and not empty', function(done) {
        var disk = new Disk(disks.first);
        assert.equal(disk.validationErrors().length, 0);
        done();
    });

    it('should be invalid when name is not present', function(done) {
        var disk = new Disk(disks.withoutName);
        assert.equal(disk.validationErrors().length, 1);
        assert.equal(disk.validationErrors()[0], 'Name is required!');
        done();
    });

    it('should be invalid when name is empty', function(done) {
        var disk = new Disk(disks.withEmptyName);
        assert.equal(disk.validationErrors().length, 1);
        assert.equal(disk.validationErrors()[0], 'Name is required!');
        done();
    });

    it('should be invalid when author is not present', function(done) {
        var disk = new Disk(disks.withoutAuthor);
        assert.equal(disk.validationErrors().length, 1);
        assert.equal(disk.validationErrors()[0], 'Author is required!');
        done();
    });

    it('should be invalid when author is empty', function(done) {
        var disk = new Disk(disks.withEmptyAuthor);
        assert.equal(disk.validationErrors().length, 1);
        assert.equal(disk.validationErrors()[0], 'Author is required!');
        done();
    });


    it('should be invalid when price is not present', function(done) {
        var disk = new Disk(disks.withoutPrice);
        assert.equal(disk.validationErrors().length, 1);
        assert.equal(disk.validationErrors()[0], 'Price is required!');
        done();
    });

    it('should be invalid when price is negative', function(done) {
        var disk = new Disk(disks.withInvalidPrice);
        assert.equal(disk.validationErrors().length, 1);
        assert.equal(disk.validationErrors()[0], 'Price should be at least 0.01!');
        done();
    });

    it('should be valid when price is 1 cent', function(done) {
        var disk = new Disk(disks.withLowPrice);
        assert.equal(disk.validationErrors().length, 0);
        done();
    });


    it('should be invalid when there is no description', function(done) {
        var disk = new Disk(disks.withoutDescription);
        assert.equal(disk.validationErrors().length, 1);
        assert.equal(disk.validationErrors()[0], 'Description is required!');
        done();
    });

});
