var DiskMongo = require('./disk/disk_mongo');
var logger = require('../../logger');
var DiskFullText = require('./disk/disk_full_text');
var _ = require('underscore');

var Disk = function(params) {
    this.name = params.name;
    this.author = params.author;
    this.price = params.price;
    this.description = params.description;
}

function extractFields(context) {
    return {
        name: context.name,
        author: context.author,
        price: context.price,
        description: context.description
    }
}

function cbWithLog(cb, err, data) {
    if (err) {
        var error = new Error(err);
        logger.error(error);
    }
    cb(err, data);
}

Disk.prototype.save = function(cb) {
    var diskMongo = new DiskMongo(this);
    diskMongo.save(function(err, data) {
        if (err) {
            cb(err);
        } else {
            var params = extractFields(this);
            DiskFullText.create(this.id, params, cbWithLog.bind(this, cb));
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
        else DiskFullText.remove(id, cbWithLog.bind(this, cb));
    });
}

Disk.findOneAndUpdate = function(id, params, cb) {
    DiskMongo.findOneAndUpdate({
        _id: id
    }, params, function(err, data) {
        DiskFullText.findOneAndUpdate(id, params, cbWithLog.bind(this, cb));
    });
}

Disk.fullTextSearch = function(params, cb) {
    DiskFullText.find(params, cb);
}

module.exports = Disk;
