//Para poder tener acceso a las nuevas novedades de Javascript
'use strict'
// Registrar los controladores para los modelos
const Cliente = require('../models/clientes');
const Prestamo = require('../models/prestamos');
const Ticket = require('../models/tickets');
//Requerir modulos necesarios para las funciones
const mongoosePaginate = require('mongoose-pagination');
const moment = require('moment');


exports.addTicket = (req, res) => {
  let params = req.body;
  let ticket = new Ticket();

  
};
