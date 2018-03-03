//Usar las nuevas tecnologias de JavaScript
'use strict'
//Requerir mongoose para crear los esquemas de la base de datos
const models = require('mongoose');
const Schema = models.Schema;

let CierreSchema = new Schema({
    prestamo: {type: Schema.Types.ObjectId, ref: 'Prestamo'},
    cliente: {type: Schema.Types.ObjectId, ref: 'Cliente'},
    pago_realizado: Boolean,
    fecha: Date,
    abono: Number,
    completado: Boolean,
    mora: Number
});

module.exports = models.model('Cierre', CierreSchema);
