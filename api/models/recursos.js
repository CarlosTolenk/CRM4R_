//Usar las nuevas tecnologias de JavaScript
'use strict'
//Requerir mongoose para crear los esquemas de la base de datos
const models = require('mongoose');
const Schema = models.Schema;

let RecursosSchema = new Schema({
    tipo: String,
    descripcion: String,
    archivo: String
});

module.exports = models.model('Recurso', RecursosSchema);
