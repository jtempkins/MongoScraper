const express = require("express");
  router = express.Router();
const axios = require ("axios");
const cheerio = require("cheerio");
let scrapedArticles = [];

router.get('/', (req,res) => {
    axios.get("https://www.nytimes.com/")
    .then (function(response){
    var $  = cheerio.load(response.data)
    $(".assetWrapper").each(function(i,element){
        var headline = $(this).find("h2").text();
        var summary = $(this).find("p").text();
        var url = $(this).find("a").attr("href");
    scrapedArticles.push({
       headline: headline,
       summary: summary,
       url: url 
    })

    })
    })
    console.log(scrapedArticles)

    res.send(scrapedArticles)
});
module.exports = router
