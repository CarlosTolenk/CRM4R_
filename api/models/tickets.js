//Usar las nuevas tecnologias de JavaScript
'use strict'
//Requerir mongoose para crear los esquemas de la base de datos
const models = require('mongoose');
const Schema = models.Schema;

let TicketsSchema = new Schema({
    tipo: String,
    descripcion: String,
    cliente: String,
    prestamo: {type: Schema.Types.ObjectId, ref: 'Prestamo'},
    votos: Number,
    pre_estado:String,
    estado: String,
    fecha: Date
});

module.exports = models.model('Ticket', TicketsSchema);
