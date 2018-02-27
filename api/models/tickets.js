//Usar las nuevas tecnologias de JavaScript
'use strict'
//Requerir mongoose para crear los esquemas de la base de datos
const models = require('mongoose');
const Schema = models.Schema;

let TicketsSchema = new Schema({
    titulo: String,
    descripcion: String,
    prestamo: {type: Schema.Types.ObjectId, ref: 'Prestamo'},
    validacion: Number,
    comentarios: {type: Schema.Types.ObjectId, ref: 'Comentario'},
    conclusion: Boolean,
    fecha: Date
});

module.exports = models.model('Ticket', TicketsSchema);
