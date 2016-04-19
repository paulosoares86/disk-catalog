var DiskMongo = require('./disk/disk_mongo');
var DiskFullText = require('./disk/disk_full_text');
var _ = require('underscore');

var Disk = function(params) {
    this.name = params.name;
    this.author = params.author;
    this.image = params.image;
    this.description = params.description;
}

function extractFields(context) {
    return {
        name: context.name,
        author: context.author,
        image: context.image,
        description: context.description
    }
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

Disk.all = function(cb) {
    var diskMongo = DiskMongo.find({}, cb);
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
    }, params, function(err, data) {
        DiskFullText.findOneAndUpdate(id, params, cb);
    });
}

Disk.search = function(params, cb) {
    DiskFullText.find(params, cb);
}

module.exports = Disk;
