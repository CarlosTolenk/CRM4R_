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
      && params.ocupacion && params.salario && params.descripcion && params.telefono && params.sector){
      //Pasar todo los campos de la peticion al miembro del team
      cliente.nombre = params.nombre;
      cliente.apellido = params.apellido;
      cliente.cedula = params.cedula;
      cliente.email = params.email;
      cliente.telefono = params.telefono;
      cliente.trabajo = params.trabajo;
      cliente.direccion = params.direccion;
      cliente.sector = params.sector;
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

//Obtener todos los clientes
exports.getClientes  = (req, res) => {

  Cliente.find().sort('nombre').exec((err, clientes) => {
     if(err) return res.status(500).send({message: 'Error en la petición'});

     if(!clientes) return status(404).send({message: 'No hay clientes disponibles'});

     return res.status(200).send({clientes});
  });
};

//Obtener solo un cliente por medio de un id
exports.getCliente = (req, res) => {
    //Guardar el id que nos llega por la url
    let clienteId = req.params.id;

    Cliente.findById(clienteId, (err, cliente) => {
      if(err) return res.status(500).send({message: 'Error en la peteción'});

      if(!cliente) return res.status(404).send({message: 'Usuario no existe'});

      return res.status(200).send({cliente});
    });
};

exports.updateCliente = (req, res) => {
  let clienteId = req.params.id;
  let update = req.body;
  let avg = 0;



    if(update.score){
        avg = calcularAvg(update.score, update.salario, clienteId).then((value) => {

        update.avg = value;

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
async function calcularAvg(score, salario, clienteId){
  let avgSalario = 0;
  //Condiciones del avg en base al data credito
  let avgScore = (score * 30)/2000; //15
  let avgTotal = 0;

let avg = await Cliente.findById(clienteId, (err, cliente) =>{
      if(err) return handleError(err);

      //Condiciones del avg en base al salario
      if(salario <= 10000) avgSalario = 15;  // Maximo un 40% cuotas de la prestamo
      if(salario > 10001 && salario <= 20000) avgSalario = 25;
      if(salario > 20001 && salario <= 30000) avgSalario = 35;
      if(salario > 30001 && salario <= 40000) avgSalario = 45;
      if(salario > 40001 && salario <= 50000) avgSalario = 50;
      if(salario > 50001 && salario <= 60000) avgSalario = 60;
      if(salario > 60001 && salario <= 70000) avgSalario = 70;
      if(salario > 70001 && salario <= 80000) avgSalario = 75;
      if(salario > 80001 && salario <= 90000) avgSalario = 80;
      if(salario > 90001 && salario <= 100000) avgSalario = 90;


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
            return res.status(200).send({cliente: clienteUpdated});
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
