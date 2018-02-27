//Para poder tener acceso a las nuevas novedades de Javascript
'use strict'
// Registrar los controladores para los modelos
const Team = require('../models/teams');
//Requerir modulos necesarios para las funciones
const bcrypt = require('bcrypt-nodejs');
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
      team.role = 'ROLE_TEAM';
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

  let email = params.email;
  let password = params.password;

    Team.findOne({email: email}, (err, team) => {
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
