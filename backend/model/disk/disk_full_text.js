var _ = require('underscore');
var elasticsearch = require('elasticsearch');
var env = require('../../../config/env');
var client = new elasticsearch.Client({
    host: 'localhost:9200'
});

var indexName = 'disk-collection-' + env;
var baseQueryObject = {
    index: indexName,
    type: 'disk'
};

function queryObject(id, params) {
    var obj = params ? _.extend(params, baseQueryObject) : baseQueryObject;
    return _.extend({id: id}, obj);
}

module.exports = {

    find: function(params, cb) {
        var queryObject = {"q": params.query};
        var q = _.extend(queryObject, baseQueryObject);
        client.search(q, function(err, data) {
            if (err) {
                cb(err);
                return;
            }
            cb(err, {
                disks: data.hits.hits.map(function(hit) {
                        return _.extend({
                            _id: hit._id
                        }, hit._source);
                    })
                });
        });
    },

    findOneAndUpdate: function(id, params, cb) {
        if (params._id) delete params._id;
        client.update(queryObject(id.toString(), {
            body: {
                doc: params
            }
        }), cb);
    },

    remove: function(id, cb) {
        client.delete(queryObject(id.toString()), cb);
    },

    create: function(id, params, cb) {
        client.create(queryObject(id.toString(), {
            body: params
        }), cb);
    },

    removeAll: function(cb) {
        client.indices.delete({
            index: indexName
        }, cb);
    }
}
