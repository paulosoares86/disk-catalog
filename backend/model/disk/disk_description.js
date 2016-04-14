var _ = require('underscore');
var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
    host: 'localhost:9200'
});

DiskDescription = function(id, description) {
    this.id = id;
    this.description = description;
}

function getListFromHits(data) {
    if (data && data.hits && data.hits.hits)
        return data.hits.hits.map(function(hit) {
            return hit._source;
        });
    return [];
}

DiskDescription.all = function(cb) {
    client.search({
        index: 'disk-collection',
        q: 'description:*'
    }, function(err, data) {
        if (!cb) console.log(data.hits.hits);
        else if (err) cb(err);
        else cb(err, getListFromHits(data));
    });
}

DiskDescription.findById = function(id, cb) {
    client.get({
        index: 'disk-collection',
        type: 'disk',
        id: id
    }, cb);
}

DiskDescription.findOneAndUpdate = function(id, params, cb) {
    client.update({
            index: 'disk-collection',
            type: 'disk',
            id: id,
            body: {
                doc: params
            }
        },
        function(err, data) {
            setTimeout(cb.bind(this, err, data), 1000);
        });
}

DiskDescription.remove = function(id, cb) {
    client.delete({
            index: 'disk-collection',
            type: 'disk',
            id: id
        },
        function(err, data) {
            setTimeout(cb.bind(this, err, data), 1000);
        });
}

// TODO: documentar melhor
DiskDescription.prototype.save = function(cb) {
    client.create({
            index: 'disk-collection',
            type: 'disk',
            id: this.id,
            body: {
                id: this.id,
                description: this.description
            }
        },
        function(err, data) {
            setTimeout(cb.bind(this, err, data), 1000);
        }
    );
}

DiskDescription.removeAll = function(cb) {
    client.indices.delete({
        index: 'disk-collection'
    }, cb);
}

module.exports = DiskDescription;
