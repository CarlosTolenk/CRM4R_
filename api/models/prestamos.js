//Usar las nuevas tecnologias de JavaScript
'use strict'
//Requerir mongoose para crear los esquemas de la base de datos
const models = require('mongoose');
const Schema = models.Schema;

let PrestamoSchema = new Schema({
    cliente: {type: Schema.Types.ObjectId, ref: 'Cliente'},
    monto_original: Number,
    metodo_pago: Number,
    interes: Number,
    duracion: Number,
    garante: String,
    total_monto: Number,
    estado: String,
    fecha: Date,
    garantia: {type: Schema.Types.ObjectId, ref: 'Garantia'}
});

module.exports = models.model('Prestamo', PrestamoSchema);
