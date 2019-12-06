const articles = require("../models/index");


module.exports = {
    fetch: function(cb) {
        articles(function(data) {
        })

        articles.collection.insertMany(articles, {ordered:false}, function(err, docs){
            cb(err, docs);
        })
    },
    delete: function(query, cb) {
        articles.remove(query, cb);
    },
    get: function(query, cb) {
        articles.find(query).sort({
            _id: -1
        })
        .exec(function(err, doc) {
            cb(doc);
        });
    },
    update: function(query, cb) {
        articles.update({_id: query._id}, {
            $set: query
        }, {}, cb);
    }

}