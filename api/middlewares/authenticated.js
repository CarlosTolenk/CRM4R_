'use strict'

const jwt = require('jwt-simple');
const moment = require('moment');
const secret = 'crm_4r_carlostolenk_backend';

exports.ensureAuth = (req, res, next) => {
    if(!req.headers.authorization){
      return res.status(403).send({message: 'La peticion no tiene la cabecera de autentificación'});
    }

    let token = req.headers.authorization.replace(/['"]+/g, '');
    try{
        var payload = jwt.decode(token, secret);

        if(payload.exp <= moment().unix()){
          return res.status(401).send({
            message: 'El Token ha expirado'
          });
        }
    }catch(ex){
        return res.status(404).send({
          message: 'El Token no es válido'
        });
    }

    req.user = payload;
    next();
};
