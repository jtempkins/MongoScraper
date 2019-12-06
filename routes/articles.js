const express = require("express");
  router = express.Router(),
  db = require("../models");

//route to update to true
router.get('/save/:id', (req,res) => {
  db.Article
    .update({_id: req.params.id}, {saved: true})
    .then(res=> res.redirect('/'))
    .catch(err => res.json(err));
});

//route to show saved articles & to handlebars
router.get('/savedArticles', (req,res) => {
  db.Article
    .find({})
    .then(res => res.render('savedArticles', {articles:res}))
    .catch(err => res.json(err));
});

router.post("/articles/save/", (req, res) => {
  console.log("do we have anything?", req.body)
  db.Article
  .create(req.body)
  console.log(req.body)
  .then(res => res.status("article saved").send(res))
  // .then(result => res.send("article saved", result))
  .catch(err => res.json(err));
});

// delete article from saved Articles
router.delete('/deleteArticles/:id', function(req,res){
  db.Article
    .remove({_id: req.params.id})
    .then(res => res.json(result))
    .catch(err => res.json(err));
});

module.exports = router;