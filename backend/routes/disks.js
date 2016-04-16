var _       = require('underscore'),
  express   = require('express'),
  Disk      = require('../model/disk'),
  router    = express.Router();

function buildResponse(error, data) {
    if (error && error.errors) {
        var errMsgs = _.values(error.errors).map(function(e) {
            return e.message;
        });
        this.status(400).send({
            error: errMsgs
        });
    } else if (error) {
        this.status(500).send({
            error: error
        });
    } else {
        this.send(data || {});
    }
}

router.get('/', function(req, res, next) {
    Disk.all(buildResponse.bind(res));
});

router.get('/:id', function(req, res, next) {
    Disk.findById(req.params.id, buildResponse.bind(res));
});

router.delete('/:id', function(req, res, next) {
    Disk.remove(req.params.id, buildResponse.bind(res));
});

router.patch('/:id', function(req, res, next) {
    Disk.findOneAndUpdate(req.params.id, req.body, buildResponse.bind(res));
});

router.post('/', function(req, res, next) {
    var disk = new Disk(req.body.disk);
    disk.save(buildResponse.bind(res));
});

module.exports = router;
