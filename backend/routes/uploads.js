var express = require('express');
var path = require('path');
var multer = require("multer");
var router = express.Router();
var logger = require('../../logger');

var imagesPath = path.join(__dirname, '..', 'public', 'images');
router.post('/', multer({dest: imagesPath}).array("uploads[]", 12), function(req, res) {
  if (!req.files || req.files.length == 0) {
    res.status(400).send({
        validationErrors: ['Image is required!'],
        error: 'Invalid record'
    });
  } else {
    res.send(req.files);
  }
});

module.exports = router;
