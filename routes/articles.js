const express = require("express");
  router = express.Router(),
  db = require("../models");

//route to update to true
router.get('/save/:id', (req,res) => {
  db.Article
    .update({_id: req.params.id}, {saved: true})
    .then(result=> res.redirect('/'))
    .catch(err => res.json(err));
});

//route to show saved articles & to handlebars
router.get('/savedArticles', (req,res) => {
  db.Article
    .find({})
    .then(result => res.render('savedArticles', {articles:result}))
    .catch(err => res.json(err));
});

// delete article from saved Articles
router.delete('/deleteArticles/:id', function(req,res){
  db.Article
    .remove({_id: req.params.id})
    .then(result => res.json(result))
    .catch(err => res.json(err));
});

module.exports = router;