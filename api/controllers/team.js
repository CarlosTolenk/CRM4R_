//Para poder tener acceso a las nuevas novedades de Javascript
'use strict'
// Registrar los controladores para los modelos
const Team = require('../models/teams');


exports.saludo = (req, res,next) => {
  res.send("Tu maldita madre");
};
