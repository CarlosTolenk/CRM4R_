//Poder accerder a las nuevas tecnologias y carácteristicas de Javascript
'use strict'
//Requiriendo los controlladores de los modulos para las rutas
const TeamController = require('../controllers/team');
const path = require('path');
//Middlewares autentificación
const md_auth = require('../middlewares/authenticated');

const multipart = require('connect-multiparty');
const md_upload = multipart({uploadDir: './uploads/teams'});


	module.exports = function(app){
		//Rutas del miembro del Team login y registro
		app.post('/api/register', TeamController.saveTeam);
		app.post('/api/login', TeamController.loginTeam);
		app.get('/api/team/:id', md_auth.ensureAuth, TeamController.getTeam);
		app.put('/api/update-team/:id',md_auth.ensureAuth, TeamController.updateTeam);
		app.post('/api/upload-image-team/:id', [md_auth.ensureAuth, md_upload], TeamController.uploadImage);
		//metodo de prueba
		app.get('/hola', md_auth.ensureAuth, TeamController.holaMundo);






	};
