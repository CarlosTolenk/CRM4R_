//Para poder tener acceso a las nuevas novedades de Javascript
'use strict'
// Registrar los controladores para los modelos
const Cliente = require('../models/clientes');
//Requerir modulos necesarios para las funciones
const mongoosePaginate = require('mongoose-pagination');
const moment = require('moment');
const fs = require('fs');
const path = require('path');

//Método para agregar un nuevo cliente
exports.saveCliente = (req, res, next) => {
  //Recoger toda la informacion de la peticion
  let params = req.body;
  //Instanciar una variable para el Cliente que se va a crear
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

      //Controlar los miembros del equipo duplicados
      Cliente.findOne({ $or: [
                {cedula: cliente.cedula.toLowerCase()},
                {email: cliente.email}
      ]}).exec((err, clientes) => {
        if(err) return res.status(500).send({message: 'Error en la petición del cliente'});

        if(clientes){
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
  let avg = 0;

    if(update.scoreData){
        avg = calcularAvg(update.scoreData, clienteId).then((value) => {

                update.avg = value;
                console.log(update);

          Cliente.findByIdAndUpdate(clienteId, update, {new: true}, (err, clienteUpdated) => {
            if(err) return res.status(500).send({message: 'Error en la peteción'});

            if(!clienteUpdated) return res.status(404).send({message: 'No se ha podido actualizar el miembro del equipo'});

              return res.status(200).send({cliente: clienteUpdated});
          });
        });
      }else{
        Cliente.findByIdAndUpdate(clienteId, update, {new: true}, (err, clienteUpdated) => {
          if(err) return res.status(500).send({message: 'Error en la peteción'});

          if(!clienteUpdated) return res.status(404).send({message: 'No se ha podido actualizar el miembro del equipo'});

            return res.status(200).send({cliente: clienteUpdated});
        });
      }


      /**/




};

//Calculo para tener el avg del cliente
async function calcularAvg(score, clienteId){
  let avgSalario = 0;
  //Condiciones del avg en base al data credito
  let avgScore = (score * 80)/2000;
  let avgTotal = 0;

let avg = await Cliente.findById(clienteId, (err, cliente) =>{
      if(err) return handleError(err);

      //Condiciones del avg en base al salario
      if(cliente.salario <= 10000) avgSalario = 1;
      if(cliente.salario > 10001 && cliente.salario <= 20000) avgSalario = 2;
      if(cliente.salario > 20001 && cliente.salario <= 30000) avgSalario = 5;
      if(cliente.salario > 30001 && cliente.salario <= 40000) avgSalario = 10;
      if(cliente.salario > 40001 && cliente.salario <= 50000) avgSalario = 14;
      if(cliente.salario > 50001 && cliente.salario <= 60000) avgSalario = 18;
      if(cliente.salario > 60001) avgSalario = 20;
      avgTotal = avgScore + avgSalario;
      return avgTotal;
  });

return avgTotal;

}




exports.destroyCliente = (req, res) => {
   Cliente.remove({_id: req.params.id}, function(error){
      if(error){
         return res.status(500).send({message: 'Error al eliminar el cliente'});
      }else{
         return res.status(200).send({message: 'Eliminado correctamente el cliente'});
      }
   });
};

//Subir archivos de imagen/avatar para los miembros del equipo
exports.uploadImage = (req, res) => {
  let clienteId = req.params.id;

  if(req.files){
  //   console.log(req.files);
      var file_path = req.files.image.path;
  // console.log(file_path);
      var file_split = file_path.split('\\');
      console.log(file_split);
      var file_name = file_split[3];
      console.log(file_name);
      var ext_split = file_name.split('\.');
      var file_ext = ext_split[1];
      console.log(file_ext);

      if(file_ext == 'png' || file_ext == 'jpg' || file_ext == 'jpeg' || file_ext == 'gif'){
        //Actualizar documento de miembro de equipo.

        Cliente.findByIdAndUpdate(clienteId, {avatar: file_name}, {new:true}, (err, clienteUpdated) => {
            if(err) return res.status(500).send({message: 'Error en la peteción'});

            if(!clienteUpdated) return res.status(404).send({message: 'No se ha podido actualizar el cliente'});
            return res.status(200).send({user: clienteUpdated});
        });

      }else{
      return  removeFilesOfUploads(res, file_path, 'Extensión no válida');
      }


  }else{
    return res.status(200).send({message: 'No se han subido archivos'});
  }
};

exports.getImageFile = (req, res) => {
  let image_file = req.params.imageFile;
  let path_file = 'api/uploads/clientes/' + image_file;
  console.log(path_file);

  fs.exists(path_file, (exists) => {
    if(exists){
      res.sendFile(path.resolve(path_file));
    }else{
      res.status(200).send({message: 'No existe la imagen..'});
    }
  });
};

//Remover los archivos subidos a la carpeta upload
function removeFilesOfUploads(res, file_path, message){
  fs.unlink(file_path, (err) => {
      return res.status(200).send({message: message});
  });
}
