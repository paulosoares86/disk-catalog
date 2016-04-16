var env = require('../../../config/env');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/backend-' + env);

var Disk = mongoose.model('Disk', {
    name: {
        type: String,
        required: [true, 'Name is required!']
    },
    author: {
        type: String,
        required: [true, 'Author is required!']
    },
    price: {
        type: Number,
        required: [true, 'Price is required!'],
        min: [0.01, 'Price should be at least 0.01']
    },
    description: {
        type: String,
        required: [true, 'Description is required!']
    }
});

Disk.removeAll = function() {
    mongoose.connection.db.dropDatabase();
}

module.exports = Disk;
