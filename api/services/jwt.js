'use strict'

const jwt = require('jwt-simple');
const moment = require('moment');
const secret = 'crm_4r_carlostolenk_backend';

exports.createToken = (user) => {
  let payload = {
      sub: user._id,
      nombre: user.nombre,
      apellido: user.apellido,
      nombre_usuario: user.nombre_usuario,
      email: user.email,
      role: user.email,
      avatar: user.avatar,
      iat: moment().unix(),
      exp: moment().add(30, 'days').unix
  };

  return jwt.encode(payload, secret)

};
