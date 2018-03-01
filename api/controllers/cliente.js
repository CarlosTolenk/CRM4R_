//Para poder tener acceso a las nuevas novedades de Javascript
'use strict'
// Registrar los controladores para los modelos
const Cliente = require('../models/clientes');
//Requerir modulos necesarios para las funciones
const mongoosePaginate = require('mongoose-pagination');
const moment = require('moment');

//Método para hacer el registro de los miembros del equipo
exports.saveCliente = (req, res, next) => {
  //Recoger toda la informacion de la peticion
  let params = req.body;
  //Instanciar una variable para el Team que se va a crear
  let cliente = new Cliente();
 //Verificar si se han enviado todos los parámetros
  if(params.nombre && params.apellido && params.cedula && params.email && params.direccion
      && params.ocupacion && params.salario && params.descripcion){
      //Pasar todo los campos de la peticion al miembro del team
      cliente.nombre = params.nombre;
      cliente.apellido = params.apellido;
      cliente.cedula = params.cedula;
      cliente.email = params.email;
      cliente.direccion = params.direccion;
      cliente.ocupacion = params.ocupacion;
      cliente.salario = params.salario;
      cliente.descripcion = params.descripcion;
      cliente.fecha = moment().format('LL');
      cliente.avatar = null;

      var nombre_completo = cliente.nombre + cliente.apellido


      //Controlar los miembros del equipo duplicados
      Cliente.find({ $or: [
                {cedula: cliente.cedula.toLowerCase()},
                {nombre_usuario: nombre_completo.toLowerCase()}
      ]}).exec((err, clientes) => {
        if(err) return res.status(500).send({message: 'Error en la petición del miembro del equipo'});

        if( clientes && clientes.length >= 1){
          return res.status(200).send({message: 'El cliente que intenta registrar, ya existe!!'});
        }else{
            //Aplicar el guardado a la base de dato por medio del metodo save de mongoose
            cliente.save((err, clienteStore) => {
              if(err) return res.status(500).send({message: 'Error al guardar el nuevo cliente'});

              if(clienteStore){
                res.status(200).send({cliente: clienteStore});
              }else{
                res.status(404).send({message: 'No se ha podido registrar el nuevo cliente'});
              }
            });
        }
      });

//Si no estan todos los parámetros, nos envia que se deben llenar todos los campos
  }else{
    res.status(200).send({
      message: 'Debes llenar todos los campos requeridos para el correcto registro'
    });
  }
};





exports.getClientes  = (req, res) => {

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

exports.updateCliente = (req, res) => {
  let clienteId = req.params.id;
  let update = req.body;

  Cliente.findByIdAndUpdate(clienteId, update, {new: true}, (err, clienteUpdated) => {
    if(err) return res.status(500).send({message: 'Error en la peteción'});

    if(!clienteUpdated) return res.status(404).send({message: 'No se ha podido actualizar el miembro del equipo'});

    return res.status(200).send({cliente: clienteUpdated});
  });

};

exports.destroyCliente = (req, res) => {
   Cliente.remove({_id: req.params.id}, function(error){
      if(error){
         return res.status(500).send({message: 'Error al eliminar el cliente'});
      }else{
         return res.status(200).send({message: 'Eliminado correctamente el cliente'});
      }
   });
};
