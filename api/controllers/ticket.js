//Para poder tener acceso a las nuevas novedades de Javascript
'use strict'
// Registrar los controladores para los modelos
const Cliente = require('../models/clientes');
const Ticket = require('../models/tickets');
const Prestamo = require('../models/prestamos');
//Requerir modulos necesarios para las funciones
const mongoosePaginate = require('mongoose-pagination');
const moment = require('moment');


exports.addTicket = (req, res) => {
  let params = req.body;
  let ticket = new Ticket();

  Cliente.findOne({ cedula: params.cedula })
    .exec((err, cliente) => {
      if(err) return res.status(500).send({message: 'Error en la petición del cliente para el  ticket'});
      if(cliente){

        ticket.tipo = params.tipo;
        ticket.descripcion = params.descripcion;
        ticket.cliente = cliente._id;
        ticket.estado = "EN PROCESO";
        ticket.fecha = moment().format('LL');

        ticket.save((err, ticketStore) => {
          if(err) return res.status(500).send({message: 'Error al guardar el nuevo ticket'});

          if(ticketStore){
            res.status(200).send({ticket: ticketStore});
          }else{
            res.status(404).send({message: 'No se ha podido registrar el nuevo Ticket'});
          }
        }); //save ticket


      }else{
        return res.status(404).send({message: 'Error, ese cliente no existe'});
      }
    }); //.exec de la búsqueda del cliente
};


exports.getTickets = (req, res) => {

  Ticket.find().populate({path: 'prestamo'}).exec((err, tickets) => {
     if(err) return res.status(500).send({message: 'Error en la petición'});

     if(!tickets) return status(404).send({message: 'No hay Prestamos disponibles'});
          return res.status(200).send({ tickets });
      });

};

//Obtener la información del Ticket
exports.getTicket = (req, res) => {
    //Guardar el id que nos llega por la url
    let ticketId = req.params.id;

    Ticket.findById(ticketId).populate('prestamo').exec((err, ticket) => {
      if(err) return res.status(500).send({message: 'Error en la peteción'});

      if(!ticket) return res.status(404).send({message: 'Usuario no existe'});

      return res.status(200).send({ticket});
    });
};

exports.editTicket = (req, res) => {
  let ticketId = req.params.id;
  let update = req.body;
  let confirmacion_voto = req.body.votos;
  let estado_prestamo;


  Ticket.findByIdAndUpdate(ticketId, update, {new: true}).populate({path: 'prestamo'}).exec((err, ticketUpdated) => {
    if(err) return res.status(500).send({message: 'Error en la peteción'});

    if(!ticketUpdated) return res.status(404).send({message: 'No se ha podido actualizar el ticket'});


      if(ticketUpdated.tipo == "Prestamo"){
        update = estadoCompletado(ticketUpdated).then((value) => {
            ticketUpdated.estado = value;

            Ticket.findByIdAndUpdate(ticketId, ticketUpdated, {new: true}, (err, nuevoticketUpdated) => {
              if(err) return res.status(500).send({message: 'Error en la peteción'});

              if(!nuevoticketUpdated) return res.status(404).send({message: 'No se ha podido actualizar el prestamo'});

                return res.status(200).send({ticket: nuevoticketUpdated});
              //Envio de información

            });
        });

      }else{
        return res.status(200).send({ticket: ticketUpdated});
      }

  });

};
//Funcion ASync para poder obtener la actualizaciín y verificar los votos del ticket
async function estadoCompletado(ticket){
  let prestamoId = ticket.prestamo._id;

  if(ticket.estado == "DENEGADO"){
    Prestamo.findByIdAndUpdate(prestamoId, { estado: 'DENEGADO'}, { new: true},  (error, nuevoEstado) => {
     if(error) return res.status(500).send({message: 'Error en la peteción'});

     if(!nuevoEstado){
       return res.status(404).send({message: 'No se ha podido actualizar el prestamo'});
     }else{
       console.log("Se ha cambiando");
       console.log(nuevoEstado);
     }

   });

    return ticket.estado = "DENEGADO";
  }else{
    if(ticket.votos >= 3){

      let prestamo_estado = ticket.prestamo.estado = "APROBADO";
      Prestamo.findByIdAndUpdate(prestamoId, { estado: 'APROBADO'}, { new: true},  (error, nuevoEstado) => {
       if(error) return res.status(500).send({message: 'Error en la peteción'});

       if(!nuevoEstado){
         return res.status(404).send({message: 'No se ha podido actualizar el prestamo'});
       }else{
         console.log("Se ha cambiando");
         console.log(nuevoEstado);
       }

     });

      return ticket.estado = "APROBADO";
    }else{
      Prestamo.findByIdAndUpdate(prestamoId, { estado: 'EN PROCESO'}, { new: true},  (error, nuevoEstado) => {
       if(error) return res.status(500).send({message: 'Error en la peteción'});

       if(!nuevoEstado){
         return res.status(404).send({message: 'No se ha podido actualizar el prestamo'});
       }else{
         console.log("Se ha cambiando");
         console.log(nuevoEstado);
       }

     });

      return ticket.estado = "EN PROCESO";
    }
  }

}



exports.destroyTicket = (req, res) => {

  Ticket.findById(req.params.id, (err, ticket) => {
    if(err) return res.status(500).send({message: 'Error en la peteción'});

    if(ticket.estado == "COMPLETADO"){
      Ticket.remove({_id: req.params.id}, (error) => {
         if(error){
            return res.status(500).send({message: 'Error al eliminar el ticket'});
         }else{
            return res.status(200).send({message: 'Eliminado correctamente el ticket'});
         }
      });
    }else{
      return res.status(404).send({message: 'Este ticket aún no se puede borrar'});
    }
  });
};
