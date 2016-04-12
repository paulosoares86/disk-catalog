var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send({
        disks: [{
            id: 1,
            name: 'led zeppelin',
            author: 'led zeppelin'
        }, {
            id: 2,
            name: 'Under The Bridge',
            author: 'Red Hot Chilli Peppers'
        }]
    });
});

router.post('/', function(req, res, next) {
    console.log(req)
    res.send({});
});

module.exports = router;
