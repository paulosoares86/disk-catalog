var env = require('../../../config/env');
var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

function requiredField(field) {
    return {
        type: String,
        required: [true, field + ' is required!']
    }
}

var schema = new mongoose.Schema({
    name: requiredField('Name'),
    author: requiredField('Author'),
    image: requiredField('Image'),
    description: requiredField('Description')
});
schema.plugin(mongoosePaginate);

var Disk = mongoose.model('Disk', schema);

Disk.removeAll = function() {
    mongoose.connection.db.dropDatabase();
}

mongoose.connect('mongodb://localhost/backend-' + env);

module.exports = Disk;
