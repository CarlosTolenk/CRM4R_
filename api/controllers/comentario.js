//Para poder tener acceso a las nuevas novedades de Javascript
'use strict'
// Registrar los controladores para los modelos
const Team = require('../models/teams');
const Ticket = require('../models/tickets');
const Comentario = require('../models/comentarios');

exports.addComentario = (req, res) => {
  //Tomar por parámetro la id del ticket, el texro y enviar el id del miembro del equipo.
  let ticketId = req.params.id;
  let params = req.body;
  let comentario = new Comentario();
  let accion_voto = req.body.accion_voto;

  comentario.team = params.team;
  comentario.ticket = ticketId;
  comentario.texto = params.texto;
  comentario.accion_voto = accion_voto;

    //Guardar toda la informacion del mensaje
    comentario.save((err, comentarioStore) => {
      if(err) return res.status(500).send({message: 'Error al guardar el nuevo comentario'});

      if(comentarioStore){
        res.status(200).send({comentario: comentarioStore});
      }else{
        res.status(404).send({message: 'No se ha podido registrar el nuevo comentario'});
      }
    });

};


exports.getComentarios = (req, res) => {

  let ticketId = req.params.id;

    Comentario.find( { ticket: ticketId } ).populate({path: 'team'}).exec((err, comentario) => {
         if(err) return res.status(500).send({message: 'Error en la petición'});

         if(!comentario){
           return status(404).send({message: 'No hay Comentarios disponibles'});
         } else{
            getFiltro(comentario).then((response) => {
             // console.log(response);
             return res.status(200).send({comentario: response});
           });
         }

    });
};


async function getFiltro(comentario){

  let filtroComentario = new Object;
  let comentarioArr =  new Array;
  // console.log(comentario);
   await comentario.forEach((element) => {
     filtroComentario = {
     texto: element.texto,
     team: element.team.nombre_usuario,
     avatar: element.team.avatar,
     accion_voto: element.accion_voto
   }
   comentarioArr.push(filtroComentario);
 });

// console.log(comentarioArr);
    return comentarioArr;
}
