//Usar las nuevas tecnologias de JavaScript
'use strict'
//Requerir mongoose para crear los esquemas de la base de datos
const models = require('mongoose');
const Schema = models.Schema;

let PrestamoSchema = new Schema({
    cliente: {type: Schema.Types.ObjectId, ref: 'Cliente'},
    referencia: String,
    monto_original: Number,
    metodo_pago: String,
    descripcion: String,
    duracion: Number,
    interes: Number,
    garante: String,
    monto_total: Number,
    estado: String,
    tipo: String,
    cuotas: Number,
    fecha: Date,
    garantia: String
});

module.exports = models.model('Prestamo', PrestamoSchema);


/*
Interes Compuesto
total_monto = monto_original(1 + 90%/360)^(metodo_pago) 90% es lo que quiero ganar al año

if(dia == origninal)
if(semana == semana*7) para convertirlos a días

cuotas = total_monto / metodo_pago



*/
