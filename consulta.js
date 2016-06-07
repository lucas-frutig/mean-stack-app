var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var _idProcurado = new ObjectID('575177094c43481706b0dbe8');

MongoClient.connect('mongodb://127.0.0.1:27017/contatooh'), function(erro,db){
	if(erro) throw err;
	db.collection('contatos').findOne({_id:_idProcurado},
		function(error, contato){
			if(error) throw err;
			console.log(contato);
		}
	);
};