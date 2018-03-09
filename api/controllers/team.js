//Para poder tener acceso a las nuevas novedades de Javascript
'use strict'
// Registrar los controladores para los modelos
const Team = require('../models/teams');
//Requerir modulos necesarios para las funciones
const bcrypt = require('bcrypt-nodejs');
const fs = require('fs');
const path = require('path');
//Requerir el servicio para generar el token
const jwt = require('../services/jwt');


//Método para hacer el registro de los miembros del equipo
exports.saveTeam = (req, res, next) => {
  //Recoger toda la informacion de la peticion
  let params = req.body;
  //Instanciar una variable para el Team que se va a crear
  let team = new Team();
 //Verificar si se han enviado todos los parámetros
  if(params.nombre && params.apellido && params.nombre_usuario && params.email && params.password){
      //Pasar todo los campos de la peticion al miembro del team
      team.nombre = params.nombre;
      team.apellido = params.apellido;
      team.nombre_usuario = params.nombre_usuario;
      team.email = params.email;
      team.role = params.role;
      team.avatar = null;

      //Controlar los miembros del equipo duplicados
      Team.find({ $or: [
                {email: team.email.toLowerCase()},
                {nombre_usuario: team.nombre_usuario.toLowerCase()}
      ]}).exec((err, teams) => {
        if(err) return res.status(500).send({message: 'Error en la petición del miembro del equipo'});

        if( teams && teams.length >= 1){
          return res.status(200).send({message: 'El miembro del equipo que intenta registrar, ya existe!!'});
        }else{
          //Encriptar el password y guardar el registro
          bcrypt.hash(params.password, null, null, (err, hash) => {
            team.password = hash;

            //Aplicar el guardado a la base de dato por medio del metodo save de mongoose
            team.save((err, teamStore) => {
              if(err) return res.status(500).send({message: 'Error al guardar miembro del equipo'});

              if(teamStore){
                res.status(200).send({team: teamStore});
              }else{
                res.status(404).send({message: 'No se ha podido registrar el miembro del equipo'});
              }
            });
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

//Método para hacer login de los miembros de los equipos
exports.loginTeam = (req, res) => {
  //Obtener toda la informacion de la petición
  let params = req.body;

  let nombre_usuario = params.nombre_usuario;
  let password = params.password;

    Team.findOne({nombre_usuario: nombre_usuario}, (err, team) => {
    if(err) return res.status(500).send({message: 'Error en la peticion'});

    if(team){
      bcrypt.compare(password, team.password, (err, check) => {
        if(check){

          if(params.gettoken){
              // Generar y Devolver un token
              return res.status(200).send({
                token: jwt.createToken(team)
              });

          }else{
            //Devolver datos de usuarios
            team.password = undefined;
            return res.status(200).send({team});
          }

        }else{
          return res.status(404).send({message: 'El miembro no se ha podido identificar correctamente'});
        }
      });
    }else{
      return res.status(404).send({message: 'El miembro no se ha podido identificar correctamente!!'});
    }
  });
};

//Obtener información del miembro del equipo
exports.getTeam = (req, res) => {
    //Guardar el id que nos llega por la url
    let teamId = req.params.id;

    Team.findById(teamId, (err, user) => {
      if(err) return res.status(500).send({message: 'Error en la peteción'});

      if(!user) return res.status(404).send({message: 'Usuario no existe'});

      return res.status(200).send({user});
    });
};

//Actualizar la información del miembro del equipo
exports.updateTeam = (req, res) => {
  let teamId = req.params.id;
  let update = req.body;

  //Borrar propiedad password
  delete update.password;

  if(teamId != req.user.sub){
    return res.status(500).send({message: 'No tienes permiso para actualizar los datos del miembro'});
  }

  Team.find({ $or: [
            {email: update.email.toLowerCase()},
            {nombre_usuario: update.nombre_usuario.toLowerCase()}
          ]}).exec((err, teams) => {
            var team_isset = false;
            teams.forEach((teams) => {
              if(teams && teams._id != teamId) team_isset = true;
            });

      if(team_isset) return res.status(200).send({message: 'Los datos de usuario o email estan en uso actualmente'});

    Team.findByIdAndUpdate(teamId, update, {new: true}, (err, userUpdated) => {
      if(err) return res.status(500).send({message: 'Error en la peteción'});

      if(!userUpdated) return res.status(404).send({message: 'No se ha podido actualizar el miembro del equipo'});

      return res.status(200).send({team: userUpdated});
    });
  });

};

//Subir archivos de imagen/avatar para los miembros del equipo
exports.uploadImage = (req, res) => {
  let teamId = req.params.id;

  if(req.files){

  //   console.log(req.files);
      var file_path = req.files.image.path;
  // console.log(file_path);
      var file_split = file_path.split('\\');
    //  console.log(file_split);
      var file_name = file_split[3];
      console.log(file_name);
      var ext_split = file_name.split('\.');
      var file_ext = ext_split[1];
      console.log(file_ext);

      if(teamId != req.user.sub){
         return removeFilesOfUploads(res, file_path, 'No tienes permiso para actualizar los datos del miembro');
      }

      if(file_ext == 'png' || file_ext == 'jpg' || file_ext == 'jpeg' || file_ext == 'gif'){
        //Actualizar documento de miembro de equipo.

        Team.findByIdAndUpdate(teamId, {avatar: file_name}, {new:true}, (err, userUpdated) => {
            if(err) return res.status(500).send({message: 'Error en la peteción'});

            if(!userUpdated) return res.status(404).send({message: 'No se ha podido actualizar el miembro del equipo'});
            return res.status(200).send({team: userUpdated});
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
  let path_file = 'api/uploads/teams/' + image_file;
  console.log(path_file);

  fs.exists(path_file, (exists) => {
    if(exists){
      res.sendFile(path.resolve(path_file));
    }else{
      res.status(200).send({message: 'No existe la imagen..'});
    }
  });
};


function removeFilesOfUploads(res, file_path, message){
  fs.unlink(file_path, (err) => {
      return res.status(200).send({message: message});
  });
}
