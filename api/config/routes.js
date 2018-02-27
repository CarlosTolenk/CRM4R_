//Poder accerder a las nuevas tecnologias de Javascript
'use strict'

//Requiriendo los controlladores de los modulos para las rutas
const Team = require('../controllers/team');



module.exports = function(app){

	app.get('/', Team.saludo);
	app.get('/home');





};
