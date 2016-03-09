var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;


// requiring the model
var Pokemon    = require('./models/pokemon');

//connecting MongoDB with mongoose
var mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost/pokemon', { poolSize: 1 }); // connect to our database

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
router.route('/pokemons')

    // create a bear (accessed at POST http://localhost:8080/api/pokemons)
    .post(function(req, res) {

        var pokemon = new Pokemon();      // create a new instance of the Pokemon model
        pokemon.nome = req.body.nome;  // set the pokemon name (comes from the request)

        // save the bear and check for errors
        pokemon.save(function(err) {
			if (err)
 				res.send(err);

			res.json({ message: 'Pokemon created!' });
		});
        
	})

    // get all the pokemons (accessed at GET http://localhost:8080/api/pokemons)
    .get(function(req, res) {
        Pokemon.find(function(err, pokemons) {
            if (err)
                res.send(err);

            res.json(pokemons);
        });
    });


router.route('/pokemons/:pokemon_id')

    // get the pokemon with that id (accessed at GET http://localhost:8080/api/pokemons/:pokemon_id)
    .get(function(req, res) {
        Pokemon.findById(req.params.pokemon_id, function(err, pokemon) {
            if (err)
                res.send(err);
            res.json(pokemon);
        });
    })

    // update the pokemon with this id (accessed at PUT http://localhost:8080/api/pokemons/:pokemon_id)
    .put(function(req, res) {

        // use our pokemon model to find the pokemon we want
        Pokemon.findById(req.params.pokemon_id, function(err, pokemon) {

            if (err)
                res.send(err);

            pokemon.nome = req.body.nome;  // update the pokemons info

            // save the pokemon
            pokemon.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Pokemon updated!' });
            });

        });
    })


    // delete the bear with this id (accessed at DELETE http://localhost:8080/api/pokemons/:pokemon_id)
    .delete(function(req, res) {
        Pokemon.remove({
            _id: req.params.pokemon_id
        }, function(err, pokemon) {
            if (err)
                res.send(err);

            res.json({ message: 'Pokemon successfully deleted' });
        });
    });



// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);


// START THE SERVER
app.listen(port);
console.log('Magic happens on port ' + port);