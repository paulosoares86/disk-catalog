var assert = require('assert');
var Disk = require('../backend/model/disk');
var disks = require('./fixtures/disks.json');

describe('Disk model', function() {
    it('should be valid when all fields are present and not empty', function(done) {
        var disk = new Disk(disks.first);
        disk.save(function(err) {
          assert.equal(err, undefined);
          done();
        });
    });

    it('should be invalid when name is not present', function(done) {
        var disk = new Disk(disks.withoutName);
        disk.save(function(err) {
          assert(err.errors['name'], 'Name is required!');
          done();
        });
    });

    it('should be invalid when name is empty', function(done) {
        var disk = new Disk(disks.withEmptyName);
        disk.save(function(err) {
          assert(err.errors['name'], 'Name is required!');
          done();
        });
    });

    it('should be invalid when author is not present', function(done) {
        var disk = new Disk(disks.withoutAuthor);
        disk.save(function(err) {
          assert(err.errors['author'], 'Author is required!');
          done();
        });
    });

    it('should be invalid when author is empty', function(done) {
        var disk = new Disk(disks.withEmptyAuthor);
        disk.save(function(err) {
          assert(err.errors['author'], 'Author is required!');
          done();
        });
    });

    it('should be invalid when image is not present', function(done) {
        var disk = new Disk(disks.withoutImage);
        disk.save(function(err) {
          assert(err.errors['image'], 'Image is required!');
          done();
        });
    });

    it('should be invalid when there is no description', function(done) {
        var disk = new Disk(disks.withoutDescription);
        disk.save(function(err) {
          assert(err.errors['description'], 'Description is required!');
          done();
        });
    });
});
