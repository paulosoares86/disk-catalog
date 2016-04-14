var DiskOtherFields = require('./disk/disk_other_fields');
var DiskDescription = require('./disk/disk_description');
var async = require('async');
var _ = require('underscore');

var Disk = function(params) {
    this.name = params.name;
    this.author = params.author;
    this.price = params.price;
    this.description = params.description;
}

Disk.generateObject = function(otherFields, descriptionFields) {
  return {
      id: descriptionFields.id,
      description: descriptionFields.description,
      name: otherFields.name,
      price: otherFields.price,
      author: otherFields.author
  }
}

Disk.prototype.validationErrors = function() {
    var errors = [];
    if (!this.name) errors.push('Name is required!');
    if (!this.author) errors.push('Author is required!');
    if (!this.description) errors.push('Description is required!');
    if (!this.price) errors.push('Price is required!');
    else if (this.price < 0.01) errors.push('Price should be at least 0.01!');
    return errors;
}

Disk.prototype.save = function(cb) {
    var otherFields = {
        name: this.name,
        author: this.author,
        price: this.price
    };
    var description = this.description;
    var diskOtherFields = new DiskOtherFields(otherFields);
    diskOtherFields.save(function(err, data) {
        if (err) cb(err);
        else {
            var diskDescription = new DiskDescription(data.id, description);
            diskDescription.save(function(err, data) {
                if (err) cb(err);
                else cb(err, _.extend(otherFields, {
                    id: data.id,
                    description: description
                }));
            });
        }
    })
}

Disk.all = function(cb) {
    var diskObjects = {};
    var allOtherFields = DiskOtherFields.find({}, function(err, otherFieldsData) {
        if (err || !otherFieldsData) {
            cb(err, otherFieldsData);
            return;
        }
        otherFieldsData.forEach(function(value) {
            diskObjects[value._id] = value;
        });
        DiskDescription.all(function(err, descriptionData) {
            if (err || !descriptionData) {
                cb(err, descriptionData);
                return;
            }
            var disks = descriptionData.map(function(descriptionFields) {
                var otherFields = diskObjects[descriptionFields.id];
                return Disk.generateObject(otherFields, descriptionFields);
            });
            cb(err, disks);
        });
    });
}

Disk.removeAll = function(cb) {
    DiskOtherFields.removeAll();
    DiskDescription.removeAll();
}

Disk.findById = function(id, cb) {
  DiskOtherFields.findById(id, function(err, otherFieldsData) {
    if (err) {
      cb(err, data);
      return;
    }
    DiskDescription.findById(id, function(err, descriptionFieldsData) {
      if (err) {
        cb(err, data);
        return;
      }
      cb(err, Disk.generateObject(otherFieldsData, descriptionFieldsData));
    });
  })
}

Disk.remove = function(id, cb) {
  DiskDescription.remove(id, function(err) {
    if (err) {
      cb(err);
      return;
    }
    DiskOtherFields.findById(id).remove(cb);
  });
}

Disk.findOneAndUpdate = function(id, params, cb) {
  if (params.description) {
    DiskDescription.findOneAndUpdate(id, {description: params.description}, function(err, data) {
      delete params.description;
      DiskOtherFields.findOneAndUpdate({_id: id}, params, cb);
    });
  } else {
    DiskOtherFields.findOneAndUpdate({_id: id}, params, cb);
  }
}

Disk.prototype.create = function(params) {
    var disk = new Disk(req.body.disk);
    var validationErrors = disk.validationErrors();
    if (validationErrors.length > 0) {
        res.status(400).send({
            error: validationErrors
        });
    } else {
        disk.save(buildResponse.bind(res));
    }
}

module.exports = Disk;
