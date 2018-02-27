//Usar las nuevas tecnologias de JavaScript
'use strict'
//Requerir mongoose para crear los esquemas de la base de datos
const models = require('mongoose');
const Schema = models.Schema;

let ClienteSchema =  new Schema({
    nombre: String,
    apellido: String,
    email: String,
    direccion: String,
    avatar: String,
    ocupacion: String,
    salario: Number,
    descripcion: String,
    avg: Number,
    fecha: Date,
    data_credito: {type : Schema.Types.ObjectId, ref : 'DataCredito'}
});

module.exports = models.model('Cliente', ClienteSchema);
