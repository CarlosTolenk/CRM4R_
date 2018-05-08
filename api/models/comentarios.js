//Usar las nuevas tecnologias de JavaScript
'use strict'
//Requerir mongoose para crear los esquemas de la base de datos
const models = require('mongoose');
const Schema = models.Schema;

let ComentariosSchema = new Schema({
    team: {type: Schema.Types.ObjectId, ref: 'Team'},
    ticket: {type: Schema.Types.ObjectId, ref: 'Ticket'},
    texto: String,
    accion_voto:Boolean
});

module.exports = models.model('Comentario', ComentariosSchema);
