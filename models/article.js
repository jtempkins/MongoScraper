const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const articleSchema = new Schema({
  headline: {
    type: String,
    unique: true
  },
  summary: String,
  Url: String,
  saved: {
    type: Boolean,
    default: false
  },
  notes: [
    {
      type: Schema.Types.ObjectId,
      ref: "Note"
    }
  ]
});

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;