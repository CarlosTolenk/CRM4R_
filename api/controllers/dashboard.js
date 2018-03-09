//Para poder tener acceso a las nuevas novedades de Javascript
'use strict'
// Registrar los controladores para los modelos
const Cliente = require('../models/clientes');
const Prestamo = require('../models/prestamos');
const Ticket = require('../models/tickets');


exports.getCount = (req, res) => {

  let totales = new Object;
  let prestamo = new Prestamo();
  let monto_original = 0;
  let monto_total = 0;
  let cliente_activo = 0;
  let cliente_id = '';



    Cliente.count({}, (err, countC) => {
      if(err) return res.status(500).send({message: 'Error en la peteción'});
      if(!countC) return res.status(404).send({message: 'No se ha podido actualizar el cliente'});
      totales.clientes = countC;
    });

    Prestamo.count({}, (err, countP) => {
      if(err) return res.status(500).send({message: 'Error en la peteción'});
      if(!countP) return res.status(404).send({message: 'No se ha podido actualizar el cliente'});
      totales.prestamos = countP;
    //  return res.status(200).send({Estadisticas: totales});
    });

    Ticket.count({}, (err, countT) => {
      if(err) return res.status(500).send({message: 'Error en la peteción'});
      if(!countT) return res.status(404).send({message: 'No se ha podido actualizar el cliente'});
      totales.ticket = countT;
      //return res.status(200).send({Estadisticas: totales});
    });

    Prestamo.find().exec((err, prestamos) => {
      if(err) return res.status(500).send({message: 'Error en la peteción'});
      if(!prestamos) return res.status(404).send({message: 'No se ha podido actualizar el cliente'});

      //un ciclo para recoger toda la base de datos e ir sumando los montos de los prestamos
      prestamos.forEach((prestamos) => {
        monto_original += prestamos.monto_original;
        monto_total += prestamos.monto_total;
      });
      console.log(cliente_activo);
      totales.monto_prestamo = monto_original;
      totales.monto_esperado = monto_total;

      return res.status(200).send({Estadisticas: totales});
    });





/*
teams.forEach((teams) => {
  if(teams && teams._id != teamId) team_isset = true;
});


*/








};