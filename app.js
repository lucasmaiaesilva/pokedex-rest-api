var express = require('express');
var mongoose = require('mongoose');
var consolidate = require('consolidate');


// creating a variable for use express
var app = express();
// Set the port for the server
var port = 3003;

// set the schema for the database
var Schema = mongoose.Schema;
var pokedexSchema = new Schema({
	name: String
});

app.get('/pokemon', function(req, res){
	res.send('<h1>Listagem de Todos os pokemons</h1>');
	//console.log('usuario acessou a pagina /pokemon');
});

app.get('/pokemon/:id', function(req, res){
	res.send('<h1>Mostrar somente o pokemón com o identificador: ' + req.params.id + '</h3>');
	//console.log('usuario acessou a pagina /pokemon/numero');
});

app.listen(port, function(){
	console.log('server running on port: ' + port);
	console.log('file on dirname: ' + __dirname);
});