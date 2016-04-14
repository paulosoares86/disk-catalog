var assert = require('assert');
var DiskDescription = require('../backend/model/disk/disk_description');

//
// From: https://www.elastic.co/guide/en/elasticsearch/reference/current/_modifying_your_data.html
//
// "By default, you can expect a one second delay (refresh interval) from the
// time you index/update/delete your data until the time that it appears in
// your search results. This is an important distinction from other platforms
// like SQL wherein data is immediately available after a transaction is
// completed."
//

function checkLengthAndFirstDescription(length, firstDescription, done) {
    DiskDescription.all(function(err, data) {
        assert.ifError(err);
        assert.equal(data.length, length);
        if (length > 0) assert.equal(data[0].description, firstDescription);
        done();
    });
}

function clean(cb) {
  DiskDescription.all(function(err, data) {
      if (data && data.length > 0) DiskDescription.removeAll(cb);
      else cb();
  });
}

describe('Disk Description', function() {
    before(clean);
    after(clean);

    it('should create a record on elasticsearch', function(done) {
        var description = 'description of the first disk';
        var disk = new DiskDescription('1', description);
        disk.save(checkLengthAndFirstDescription.bind(this, 1, description, done));
    });

    it('should update an existing record', function(done) {
        var newDescription = 'new description of the first disk';
        DiskDescription.findOneAndUpdate('1', {
                description: newDescription
            },
            checkLengthAndFirstDescription.bind(this, 1, newDescription, done)
        );
    });

    it('should remove records', function(done) {
        DiskDescription.remove('1', checkLengthAndFirstDescription.bind(this, 0, null, done));
    });

    it('should list records', function(done) {
        (new DiskDescription('12', 'desc1')).save(function(err, data) {
            assert.ifError(err);
            checkLengthAndFirstDescription(1, 'desc1', done);
        });
    });
});
