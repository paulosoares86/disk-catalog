var _ = require('underscore');
var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
    host: 'localhost:9200'
});

function queryObject(id, params) {
    var obj = {
        id: id,
        index: 'disk-collection',
        type: 'disk'
    };
    if (params) _.extend(obj, params);
    return obj;
}

module.exports = {

    findOneAndUpdate: function(id, params, cb) {
        client.update(queryObject(id, {body: {doc: params}}), cb);
    },

    remove: function(id, cb) {
        client.delete(queryObject(id), cb);
    },

    create: function(id, params, cb) {
        client.create(queryObject(id, {body: params}), cb);
    },

    removeAll: function(cb) {
        client.indices.delete({index: 'disk-collection'}, cb);
    }
}
