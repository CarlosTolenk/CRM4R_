//Usar las nuevas tecnologias de JavaScript
'use strict'
//Requerir mongoose para crear los esquemas de la base de datos
const models = require('mongoose');
const Schema = models.Schema;

let ClienteSchema =  new Schema({
    nombre: String,
    apellido: String,
    email: String,
    cedula: String,
    telefono: String,
    direccion: String,
    sector: String,
    avatar: String,
    ocupacion: String,
    salario: Number,
    descripcion: String,
    trabajo:String,
    score: Number,
    avg: Number,
    fecha: Date,
    activo: String,
    data_credito: {type : Schema.Types.ObjectId, ref : 'DataCredito'}
});

module.exports = models.model('Cliente', ClienteSchema);
