var mongoose     = require('mongoose');

var Schema = mongoose.Schema;
var pokedexSchema = new Schema({
	_id: Number, 
	nome: String
});

// creating a model *1st param* nome da collection, *2st param* schema 
module.exports = mongoose.model('pokedex', pokedexSchema);