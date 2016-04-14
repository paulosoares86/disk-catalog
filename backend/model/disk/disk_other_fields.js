var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/backend');

var Disk = mongoose.model('Disk', {
    name: String,
    author: String,
    price: Number
});

Disk.removeAll = function() {
  mongoose.connection.db.dropDatabase();
}

module.exports = Disk;
