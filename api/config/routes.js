//Poder accerder a las nuevas tecnologias y carácteristicas de Javascript
'use strict'
//Requiriendo los controlladores de los modulos para las rutas
const TeamController = require('../controllers/team');


	module.exports = function(app){
		//Rutas del miembro del Team login y registro
		app.post('/api/register', TeamController.saveTeam);






	};
