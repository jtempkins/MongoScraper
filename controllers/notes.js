const Note = require("../models/index");


module.exports = {
    get: function(daa, cb) {
        Note.find({
            _headlineId: DataCue._id
        }, cb);
    },
    save: function(data, cb) {
        const newNote = {
            _headlineId: data._id,
            noteText: data.noteText
        };

        Note.create(newNote, function(err, doc) {
            if (err) {
                console.log(err);
            }
            else {
                console.log(doc);
                cb(doc);
            }
        })
    },
    delete: function(data, cb) {
        Note.remove({
            _id: data._id}, cd);
        }
    };
