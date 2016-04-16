var _ = require('underscore');
var express = require('express');
var Disk = require('../model/disk');
var logger = require('../../logger');
var router = express.Router();

function buildResponse(error, data) {
    if (error && error.errors) {
        var errMsgs = _.values(error.errors).map(function(e) {
            return e.message;
        });
        this.status(400).send({
            error: errMsgs
        });
    } else if (error) {
        logger.error(error);
        this.status(500).send({error: 'Internal error'});
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

router.post('/search', function(req, res, next) {
    Disk.search(req.body, buildResponse.bind(res));
});

module.exports = router;
