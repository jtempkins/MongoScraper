const express = require("express");
const mongoose = require("mongoose");
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const axios = require("axios");
const cheerio = require("cheerio");

// Initialize Express
const app = express();

// Mongo configuration to the db variable
// const config = require('./config/database')
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.Promise = Promise;
mongoose
  .connect(MONGODB_URI, {
    // .connect(config.database, {
      useNewUrlParser: true,
      useUnifiedTopology: true
  })
  .then( result => {
    console.log(`Connected to database '${result.connections[0].name}' on ${result.connections[0].host}:${result.connections[0].port}`);
  })
  .catch(err => console.log('There was an error with your connection:', err));

//setting up body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//handlebars middleware
app.engine('handlebars', exphbs({defaultLayout: 'index'}));
app.set('view engine', 'handlebars');

//static directory
app.use(express.static('public'));
// app.use('/article',express.static(path.join(__dirname, 'public')));
// app.use('/notes',express.static(path.join(__dirname, 'public')));

//routes
const articles = require('./routes/articles');
      // notes = require('./routes/notes'),
      // notes = require('./routes/notes'),
      // scrape = require('./routes/scrape');

// app.use('/', index);
app.use(require("./routes/scrape"));
app.use(require("./routes/articles"));

// app.use('/notes', notes);
// app.use('/scrape', scrape);

// Listen on port 3000
app.listen(3000, function() {
  console.log("App running on port 3000!");
});
