//Usar las nuevas tecnologias de JavaScript
'use strict'
//Requerir mongoose para crear los esquemas de la base de datos
const models = require('mongoose');
const Schema = models.Schema;

let DataCreditoSchema = new Schema({
    texto: String
});

module.exports = models.molde('DataCredito', DataCreditoSchema);
