//Para poder tener acceso a las nuevas novedades de Javascript
'use strict'
// Registrar los controladores para los modelos
const Cliente = require('../models/clientes');
const Prestamo = require('../models/prestamos');
//Requerir modulos necesarios para las funciones
const mongoosePaginate = require('mongoose-pagination');
const moment = require('moment');

//Este método salva el pago de los clientes
exports.saveCierre = (req, res) => {

  let prestamoId = req.params.id;
  let pago_realizado = req.body.pago_realizado;
  let abono = req.body.abono;
  let fecha = moment().format('LL');

  Prestamo.findById(prestamoId).populate({path: 'cliente'}).exec((err, prestamos, total) => {
     if(err) return res.status(500).send({message: 'Error en la petición'});

     if(!prestamos) return status(404).send({message: 'No hay Prestamos disponibles'});

          return res.status(200).send({
            prestamos

          });
      });
  };





/*User.findById(id, function (err, user) {
  var opts = [
      { path: 'company', match: { x: 1 }, select: 'name' }
    , { path: 'notes', options: { limit: 10 }, model: 'override' }
  ]

  User.populate(user, opts, function (err, user) {
    console.log(user);
  });
});
*/
