var express = require('express');
var mongoose = require('mongoose');
var consolidate = require('consolidate');


// creating a variable for use express
var app = express();
// Set the port for the server
var port = 3003;

// verify the connection of mongoDB
var db = mongoose.connection;
// throw errors
db.on('error', console.error);

db.once('open', function(){
	console.log('conectado ao mongoDB.');
	// TODOS os Esquemas, modelos e consultas aqui

	// set the schema for the database
	var Schema = mongoose.Schema;
	var pokedexSchema = new Schema({
		nome: String
	});

	// creating a model *1st param* nome da collection, *2st param* schema 
	var Pokemon = mongoose.model('pokedex', pokedexSchema);

	app.get('/pokemon', function(req, res) {

		Pokemon.find().then(function(pokemons) {
			res.json( pokemons );
	});

	app.get('/pokemon/create/:name', function(req, res){

		var _pokemon = {name: req.params.name};

		Pokemon.create(_pokemon).then(function(pokemons) {
			console.log(pokemons);
			res.json( pokemons );
		});

	});


	app.get('/pokemon/:id', function(req, res){
		res.send('<h1>Mostrar somente o pokemón com o identificador: ' + req.params.id + '</h3>');
		//console.log('usuario acessou a pagina /pokemon/numero');
	});

});

mongoose.connect('mongodb://localhost/pokemon');

app.listen(port, function(){
	console.log('server running on port: ' + port);
	console.log('file on dirname: ' + __dirname);
});