var _ = require('underscore');
var elasticsearch = require('elasticsearch');
var env = require('../../../config/env');
var client = new elasticsearch.Client({
    host: 'localhost:9200'
});

var baseQueryObject = {
    index: 'disk-collection-' + env,
    type: 'disk'
};

function queryObject(id, params) {
    var obj = {
        id: id
    };
    if (params) _.extend(obj, params);
    _.extend(obj, baseQueryObject);
    return obj;
}

module.exports = {

    find: function(params, cb) {
        var queryObject = {
            body: {
                query: {
                    match: params
                }
            }
        };
        client.search(_.extend(queryObject, baseQueryObject), cb);
    },

    findOneAndUpdate: function(id, params, cb) {
        client.update(queryObject(id, {
            body: {
                doc: params
            }
        }), cb);
    },

    remove: function(id, cb) {
        client.delete(queryObject(id), cb);
    },

    create: function(id, params, cb) {
        client.create(queryObject(id, {
            body: params
        }), cb);
    },

    removeAll: function(cb) {
        client.indices.delete({
            index: 'disk-collection'
        }, cb);
    }
}
