//Para poder tener acceso a las nuevas novedades de Javascript
'use strict'
// Registrar los controladores para los modelos
const Team = require('../models/teams');
//Requerir modulos necesarios para las funciones
const bcrypt = require('bcrypt-nodejs');

exports.saveTeam = (req, res, next) => {
  //Recoger toda la informacion de la peticion
  let params = req.body;
  //Instanciar una variable para el Team que se va a crear
  let team = new Team();

  if(params.nombre && params.apellido && params.nombre_usuario && params.email && params.password){
      //Pasar todo los campos de la peticion al miembro del team
      team.nombre = params.nombre;
      team.apellido = params.apellido;
      team.nombre_usuario = params.nombre_usuario;
      team.email = params.email;
      team.role = 'ROLE_TEAM';
      team.avatar = null;

      //Encriptar el password y guardar el registro
      bcrypt.hash(params.password, null, null, (err, hash) => {
        team.password = hash;

        team.save((err, teamStore) =>{
          if(err) return res.status(500).send({message: 'Error al guardar miembro del equipo'});

          if(teamStore){
            res.status(200).send({team: teamStore});
          }else{
            res.status(404).send({message: 'No se ha podido registrar el miembro del equipo'});
          }
        });
      });


  }else{
    res.status(200).send({
      message: 'Debes llenar todos los campos requeridos para el correcto registro'
    });
  }
};
