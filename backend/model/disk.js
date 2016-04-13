var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/backend');

var Disk = mongoose.model('Disk', {
    name: String,
    author: String,
    price: Number
});

Disk.prototype.validationErrors = function() {
    var errors = [];
    if (!this.name) errors.push('Name is required!');
    if (!this.author) errors.push('Author is required!');
    if (!this.price) errors.push('Price is required!');
    return errors;
}

module.exports = Disk;
