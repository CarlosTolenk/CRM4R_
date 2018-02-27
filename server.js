//Toda la creación y configuración del servidor de Node.js

const express = require('express'),
	app = express(),
	server = require('http').createServer(app);
const PORT = process.env.PORT || 3000;


//Se agregó
var config = {
	rootPath : __dirname
};
//Enviandole a Express, el __dirname e inicializando
require('./api/config/express')(app, config);
//Configurando las rutas de forma modular
require('./api/config/routes')(app);
//Configurando el acceso a la base de dato
require('./api/models/models');

//Inicializando el servidor por el puerto
server.listen(PORT, () => {
	console.log("Servidor corriendo en el puerto: "+PORT);
});
