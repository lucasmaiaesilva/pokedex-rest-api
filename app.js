var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');

// requiring the model
var Pokemon    = require('./models/pokemon');

//connecting MongoDB with mongoose
var mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost/pokemon', { poolSize: 1 }); // connect to our database

var db = mongoose.connection;
db.once('open', function(){
	console.log('conected to MongoDB');
});

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);


// START THE SERVER
app.listen(port);
console.log('Magic happens on port ' + port);