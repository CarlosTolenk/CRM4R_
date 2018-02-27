//Requiriendo Mongoose para poder gestionar la base de datos MongoDB
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/Crm4R')
	.then(() =>{
		console.log("Conectado a la base de datos");
	}).catch((err) =>{
		console.log("Error al conectarse a la base de datos");
	});

module.exports = mongoose;
