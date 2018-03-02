//Usar las nuevas tecnologias de JavaScript
'use strict'
//Requerir mongoose para crear los esquemas de la base de datos
const models = require('mongoose');
const Schema = models.Schema;

let DataCreditoSchema = new Schema({
    score: Number,
    texto: String
});

module.exports = models.model('DataCredito', DataCreditoSchema);
