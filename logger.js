var winston = require('winston');

var logger = new(winston.Logger)({
    transports: [
        new(winston.transports.File)({
            filename: 'log/development.json'
        })
    ]
});

module.exports = logger;
