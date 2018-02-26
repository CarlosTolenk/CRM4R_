//Requiriendo los controlladores de los modulos para las rutas

//Requiriendo passport para las rutas de login y multiparty para subida de archivos como recursos


module.exports = function(app){	



	app.get('*', function(req, res) {
	  	res.render('index');
	});
};
