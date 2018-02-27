//Usar las nuevas tecnologias de JavaScript
'use strict'
//Requerir mongoose para crear los esquemas de la base de datos
const models = require('mongoose');
const Schema = models.Schema;

let GarantiaSchema = new Schema({
    titulo: String,
    prendaria: String,
    hipotecaria: String
  });

module.exports = models.model('Garantia', GarantiaSchema);
