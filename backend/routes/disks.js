var express = require('express');
var router = express.Router();
var Disk = require('../model/disk');

function makeResponse(err, data) {
  if (err) {
    this.status(500).send({error: err})
  } else {
    this.send(data || {})
  }
}

router.get('/', function(req, res, next) {
  Disk.find(makeResponse.bind(res));
});

router.post('/', function(req, res, next) {
  var disk = new Disk(req.body.disk);
  disk.save(makeResponse.bind(res));
});

module.exports = router;
