//Requerir Mongoose para poder acceder a la coleccion
const mongoose = require('mongoose');

	mongoose.connect('mongodb://localhost/CRM_4R');

	let db = mongoose.connection;
	db.on('error', console.error.bind(console, 'Error de conexión!'));
	db.once('open', function callback() {
		console.log('Base de datos CRM_4R en funcacionamiento');
	});


module.exports = mongoose;
