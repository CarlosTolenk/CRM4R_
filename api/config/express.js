//Requiriendo todos los modulos necesarios para comenzar Express
const logger = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');


module.exports = (app, config) => {
	//Configurando Swig
	/*
	app.engine('html', swig.renderFile);
	app.set('view engine', 'html');
	app.set('views', config.rootPath + '/api/views');
	*/

	//Quitando la cache para desarrollo
	app.set('view cache', false);


	app.use(cookieParser());
	app.use(logger('dev'));
	// parse application/x-www-form-urlencoded
	app.use(bodyParser.urlencoded({ extended: false }));
	// parse application/json
	app.use(bodyParser.json());


	app.use(express.static(config.rootPath + '/public'));

};
