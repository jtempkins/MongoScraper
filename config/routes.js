var scrape = require("../routes/scrape");

var articlesController = require("../routes/articles");
var notesController = require("../routes/notes");



module.exports = function(router) {
    router.get("/", function(req, res) {
        res.render("home");
    });
    router.get("/saved", function(req, res) {
        res.render("saved");
    });
    router.get("/api/fetch", function(req, res){
        articlesController.fetch(function(err, docs) {
            if (!docs || docs.insertedCount === 0) {
                res.json({
                    message: "Nothing new in the news today. Try again tomorrow."
                });
            }
            else {
                res.sjon({
                    message: "Added" + docs.insertedCount + " new articles!"
                });
            }
        });
    });
    router.get("/api/headlines", function(req, res) {
        var query = {};
        if (req.query.saved) {
            query = req.query;
        }

        articlesController.get(query, function(data){
            req.json(data);
        });
    });
    router.delete("/api/headlines/:id", function(req,res){
        var query = {};
        query._id = req.params.id;
        articlesController.delete(query, function(err, data){
            res.json(data);
        });
    });
    router.get("/api/notes/:headline_id?", function(req, res){
        var query = {};
        if (req.params.headline_id) {
            query._id = req.params.headline_id;
        }

        notesController.get(query, function(err, data){
            res.json(data);
        });
    });
    router.delete("/api/notes/:_id", function(req, res){
        var query = {};
        query.id = req.params.id;
        notesController.delete(query, function(err, data){
            res.json(data);
        });
        });
    router.post("/api/notes", function(req, res){
        notesController.save(req.body, function(data) {
            res.json(data);
        });
     });
}
// import { builtinModules, Module } from "module";

// var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

// mongoose.connect(MONGODB_URI);

// module.exports = connect 
// module.exports = function(router) {
//     router.get("/", function(req, res) {
//         res.render("home");
//     });
//     router.get("/saved", function(req, res) {
//         res.render("saved");
//     });
// }