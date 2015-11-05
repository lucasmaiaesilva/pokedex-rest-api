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

	Pokemon.find({}, function(err, pokemons){
		if (err) throw err;
		console.log(pokemons);
	});


	app.get('/api/pokemon', function(req, res, next){
		res.json({ message: 'Listagem de Todos os pokemons' });
		//console.log('usuario acessou a pagina /pokemon');
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