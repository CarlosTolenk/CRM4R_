//Para poder tener acceso a las nuevas novedades de Javascript
'use strict'
// Registrar los controladores para los modelos
const Cliente = require('../models/clientes');
const Prestamo = require('../models/prestamos');


exports.getCount = (req, res) => {

  let totales = new Object;
  let prestamo = new Prestamo();

    Cliente.count({}, (err, countC) => {
      if(err) return res.status(500).send({message: 'Error en la peteción'});
      if(!countC) return res.status(404).send({message: 'No se ha podido actualizar el cliente'});
      totales.clientes = countC;
    });

    Prestamo.count({}, (err, countP) => {
      if(err) return res.status(500).send({message: 'Error en la peteción'});
      if(!countP) return res.status(404).send({message: 'No se ha podido actualizar el cliente'});
      totales.prestamos = countP;
      //return res.status(200).send({Estadisticas: totales});
    });

    Prestamo.find({}, 'monto_original', (err, doc) => {
      if(err) return res.status(500).send({message: 'Error en la peteción'});
      if(!doc) return res.status(404).send({message: 'No se ha podido actualizar el cliente'});

      console.log(doc);
      return res.status(200).send({Estadisticas: doc});
    });

    /* Model.find({}, 'first last', function (err, docs) {
  // docs is an array of partially-`init`d documents
  // defaults are still applied and will be "populated"
}) */








};
