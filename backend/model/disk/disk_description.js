var _ = require('underscore');
var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
    host: 'localhost:9200'
});

function queryObject(id, params) {
    var obj = {id: id, index: 'disk-collection', type: 'disk'};
    if (params) _.extend(obj, params);
    return obj;
}

function delayedCallback(cb, err, data) {
    setTimeout(cb.bind(null, err, data), 1000);
}

DiskDescription = function(id, description) {
    this.id = id;
    this.description = description;
}

function handleSearchResults(cb, err, data) {
    if (err) {
        cb(err, data);
    } else {
        var hits = data && data.hits && data.hits.hits;
        if (!hits) cb(null, []);
        else cb(null, hits.map(function(hit) {return hit._source;}));
    }
}

DiskDescription.all = function(cb) {
    client.search({index: 'disk-collection', q: 'description:*'},
                  handleSearchResults.bind(this, cb));
}

DiskDescription.findById = function(id, cb) {
    client.get(queryObject(id), cb);
}

DiskDescription.findOneAndUpdate = function(id, params, cb) {
    client.update(queryObject(id, {body: {doc: params}}),
                  delayedCallback.bind(this, cb));
}

DiskDescription.remove = function(id, cb) {
    client.delete(queryObject(id), delayedCallback.bind(this, cb));
}

DiskDescription.prototype.save = function(cb) {
    client.create(queryObject(this.id, {
      body: {id: this.id, description: this.description}
    }), delayedCallback.bind(this, cb));
}

DiskDescription.removeAll = function(cb) {
    client.indices.delete({index: 'disk-collection'}, cb);
}

module.exports = DiskDescription;
