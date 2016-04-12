var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/backend');

var Disk = mongoose.model('Disk', {
  name: String,
  author: String,
  price: Number
});

module.exports = Disk;
