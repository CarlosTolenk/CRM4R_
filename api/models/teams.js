//Usar las nuevas tecnologias de JavaScript
'use strict'
//Requerir mongoose para crear los esquemas de la base de datos
const models = require('mongoose');
const Schema = models.Schema;

let TeamSchema = new Schema({
    nombre: String,
    apellido: String,
    nombre_usuario: String,
    avatar: String,
    password: String
});

exports.module = models.model('Team', TeamSchema);
