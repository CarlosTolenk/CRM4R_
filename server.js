//Toda la creación y configuración del servidor de Node.js

const express = require('express'),
	app = express(),
	server = require('http').createServer(app);
const PORT = process.env.PORT || 3000;
const Models = require('./api/models/models');

//Se agregó
var config = {
	rootPath : __dirname
};
//Enviandole a Express, el __dirname e inicializando
require('./api/config/express')(app, config);
//Configurando las rutas de forma modular
require('./api/config/routes')(app);

//Inicializando el servidor por el puerto
server.listen(PORT, () => {
	console.log("Servidor corriendo en el puerto: "+PORT);
});
