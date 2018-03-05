//Poder accerder a las nuevas tecnologias y carácteristicas de Javascript
'use strict'
//Requiriendo los controlladores de los modulos para las rutas
const TeamController = require('../controllers/team');
const ClienteController = require('../controllers/cliente');
const PrestamoController = require('../controllers/prestamo');
const CierreController = require('../controllers/cierre');
const TicketController = require('../controllers/ticket');

//Middlewares autentificación
const md_auth = require('../middlewares/authenticated');
//Requiriendo modulos necesarios para la implementaciones de los métodos
const path = require('path');
const multipart = require('connect-multiparty');
let md_uploadTeam = multipart({uploadDir: 'api/uploads/teams'});
let md_uploadCliente = multipart({uploadDir: 'api/uploads/clientes'});
let md_uploadRecurso = multipart({uploadDir: 'api/uploads/recursos'});


	module.exports = function(app){
		//Rutas del miembro del Team login y registro
		app.post('/api/register', TeamController.saveTeam);
		app.post('/api/login', TeamController.loginTeam);
		app.get('/api/team/:id', md_auth.ensureAuth, TeamController.getTeam);
		app.put('/api/update-team/:id',md_auth.ensureAuth, TeamController.updateTeam);
		app.post('/api/upload-image-team/:id', [md_auth.ensureAuth, md_uploadTeam], TeamController.uploadImage);
		app.get('/api/get-image-team/:imageFile', TeamController.getImageFile);
		//Rutas para los clientes
		app.post('/api/add-cliente', md_auth.ensureAuth, ClienteController.saveCliente);
		app.get('/api/get-clientes/:page', md_auth.ensureAuth, ClienteController.getClientes);
		app.put('/api/update-cliente/:id', md_auth.ensureAuth, ClienteController.updateCliente);
		app.delete('/api/delete-cliente/:id', md_auth.ensureAuth, ClienteController.destroyCliente);
		app.post('/api/upload-image-cliente/:id', [md_auth.ensureAuth, md_uploadCliente], ClienteController.uploadImage);
		app.get('/api/get-image-cliente/:imageFile', ClienteController.getImageFile);
		//Rutas para los préstamos
		app.post('/api/add-prestamo', md_auth.ensureAuth, PrestamoController.addPrestamo);
		app.get('/api/get-prestamos/:page', md_auth.ensureAuth, PrestamoController.getPrestamos);
		app.put('/api/update-prestamo/:id', md_auth.ensureAuth, PrestamoController.updatePrestamo);
		app.delete('/api/delete-prestamo/:id', md_auth.ensureAuth, PrestamoController.destroyPrestamo);
		//Rutas para los cierres
		app.post('/api/save-cierre/:id', md_auth.ensureAuth, CierreController.saveCierre);
		app.get('/api/get-historial/:id', md_auth.ensureAuth, CierreController.getHistorial);
		//Rutas para los tickets
		app.post('/api/add-ticket', md_auth.ensureAuth, TicketController.addTicket);
		app.get('/api/get-tickets', md_auth.ensureAuth, TicketController.getTickets);
		app.put('/api/edit-tickets/:id', md_auth.ensureAuth, TicketController.editTicket);


	};
