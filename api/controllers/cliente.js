//Para poder tener acceso a las nuevas novedades de Javascript
'use strict'
// Registrar los controladores para los modelos
const Cliente = require('../models/clientes');
//Requerir modulos necesarios para las funciones
const mongoosePaginate = require('mongoose-pagination');





exports.getClientes(req, res){

  let identity_team_id = req.user.sub;
  let page = 1;

  if(req.params.page){
    page = req.params.page;
  }

  let itemsPerPage = 5;

  Cliente.find().sort('_id').paginate(page, itemsPerPage, (err, clientes, total) => {
     if(err) return res.status(500).send({message: 'Error en la petición'});

     if(!clientes) return status(404).send({message: 'No hay clientes disponibles'});

     return res.status(200).send({
       clientes,
       total,
       pages: Math.ceil(total/itemsPerPage),
     })
  });

};
