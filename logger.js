var winston = require('winston');
var env = require('./config/env');

var logger = new(winston.Logger)({
    transports: [
        new(winston.transports.File)({
            filename: 'log/' + env + '.json'
        })
    ]
});

module.exports = logger;
