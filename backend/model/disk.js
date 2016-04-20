var DiskMongo = require('./disk/disk_mongo');
var DiskFullText = require('./disk/disk_full_text');
var config = require('../../config/config');
var _ = require('underscore');

function extractFields(context) {
    return {
        name: context.name,
        author: context.author,
        image: context.image,
        description: context.description
    }
}

var Disk = function(params) {
    _.extend(this, extractFields(params));
}

Disk.prototype.save = function(cb) {
    var params = extractFields(this);
    var diskMongo = new DiskMongo(params);
    diskMongo.save(function(err, data) {
        if (err) {
            cb(err);
        } else {
            DiskFullText.create(data._id, params, cb);
        }
    });
}

Disk.all = function(page, cb) {
    var intPage = parseInt(page);
    if (Number.isNaN(intPage)) {
      cb('Invalid format for page ' + page);
      return;
    }
    var diskMongo = DiskMongo.paginate({}, {
        page: intPage,
        limit: config.maxResultsPerQuery
    }, function(err, data) {
        if (err) {
            cb(err);
            return;
        }
        data.disks = data.docs;
        delete data.docs;
        cb(null, data);
    });
}

Disk.removeAll = function(cb) {
    DiskMongo.removeAll();
    DiskFullText.removeAll();
}

Disk.findById = function(id, cb) {
    DiskMongo.findById(id, cb);
}

Disk.remove = function(id, cb) {
    DiskMongo.findById(id).remove(function(err) {
        if (err) cb(err)
        else DiskFullText.remove(id, cb);
    });
}

Disk.findOneAndUpdate = function(id, params, cb) {
    DiskMongo.findOneAndUpdate({
        _id: id
    }, params, function(err, mongoData) {
        DiskFullText.findOneAndUpdate(id, params, function(err, data) {
            cb(err, mongoData);
        });
    });
}

Disk.search = function(params, cb) {
    DiskFullText.find(params, cb);
}

module.exports = Disk;
