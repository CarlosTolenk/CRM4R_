//Poder accerder a las nuevas tecnologias y carácteristicas de Javascript
'use strict'
//Requiriendo los controlladores de los modulos para las rutas
const TeamController = require('../controllers/team');
const ClienteController = require('../controllers/cliente');
const PrestamoController = require('../controllers/prestamo');

//Middlewares autentificación
const md_auth = require('../middlewares/authenticated');
//Requiriendo modulos necesarios para la implementaciones de los métodos
const path = require('path');
const multipart = require('connect-multiparty');
const md_upload = multipart({uploadDir: './uploads/teams'});


	module.exports = function(app){
		//Rutas del miembro del Team login y registro
		app.post('/api/register', TeamController.saveTeam);
		app.post('/api/login', TeamController.loginTeam);
		app.get('/api/team/:id', md_auth.ensureAuth, TeamController.getTeam);
		app.put('/api/update-team/:id',md_auth.ensureAuth, TeamController.updateTeam);
		app.post('/api/upload-image-team/:id', [md_auth.ensureAuth, md_upload], TeamController.uploadImage);
		//Rutas para los clientes
		app.post('/api/add-cliente', md_auth.ensureAuth, ClienteController.saveCliente);
		app.get('/api/get-clientes/:page', md_auth.ensureAuth, ClienteController.getClientes);
		app.put('/api/update-cliente/:id', md_auth.ensureAuth, ClienteController.updateCliente);
		app.delete('/api/delete-cliente/:id', md_auth.ensureAuth, ClienteController.destroyCliente);
		//Rutas para los préstamos
		app.post('/api/add-prestamo', PrestamoController.addPrestamo);





		






	};
