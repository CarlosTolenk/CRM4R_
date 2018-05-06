//Para poder tener acceso a las nuevas novedades de Javascript
'use strict'
// Registrar los controladores para los modelos
const Cliente = require('../models/clientes');
const Prestamo = require('../models/prestamos');
const Ticket = require('../models/tickets');


exports.getCount = (req, res) => {

    getCounter().then((response) => {    
      return res.status(200).send(response);
    });
};





async function getCounter(){

  let totales = new Object;
  let Prestamos;
  let Clientes;
  let Tickets;


  let TotalCliente = await Cliente.count({}, (err, countC) => {
      if(err) return res.status(500).send({message: 'Error en la peteción'});
      if(!countC) return res.status(404).send({message: 'No se ha podido actualizar el cliente'});
      totales.clientes = countC;
    });

    let TotalPrestamo = await Prestamo.count({}, (err, countP) => {
          if(err) return res.status(500).send({message: 'Error en la peteción'});
          if(!countP) return res.status(404).send({message: 'No se ha podido actualizar el cliente'});
          totales.prestamos = countP;
    });

    let TotalTicket =  await Ticket.count({}, (err, countT) => {
          if(err) return res.status(500).send({message: 'Error en la peteción'});
          if(!countT) return res.status(404).send({message: 'No se ha podido actualizar el cliente'});
          totales.ticket = countT;
      });

     await CalculosPrestamo().then(response =>{
         Prestamos = response;
       });

     await ClientesActivos(totales.clientes).then(response =>{
         Clientes = response;
       });

     await TicketsCompletados(totales.ticket).then(response =>{
         Tickets = response;
       });


      //     await Cliente.find().exec((err, clientes) => {
      //     if(err) return res.status(500).send({message: 'Error en la peteción'});
      //     if(!clientes) return res.status(404).send({message: 'No se ha podido actualizar el cliente'});
      //
      //     clientes.forEach((clientes) => {
      //       if(clientes.activo == 'true') cliente_activo++;
      //     });
      //
      //     totales.clientes_activos = cliente_activo;
      //     return cliente_activo;
      //
      //   });
      //
      //  await Ticket.find().exec((err, ticket) => {
      //       if(err) return res.status(500).send({message: 'Error en la peteción'});
      //       if(!ticket) return res.status(404).send({message: 'No se ha podido actualizar el cliente'});
      //
      //       ticket.forEach((ticket) => {
      //         if(ticket.estado == "COMPLETADO") ticket_completados++;
      //       });
      //
      //       totales.ticket_completados = ticket_completados;
      //
      // });





    return {TotalTicket, TotalPrestamo, TotalCliente, Clientes, Prestamos, Tickets };
}




// Crear una funcion para cada uno de los metodos

async function CalculosPrestamo(){
  let infoPrestamo = new Object;
  let monto_original = 0;
  let monto_total = 0;

    return new Promise(resolve => {
      Prestamo.find().exec((err, prestamos) => {
          if(err) return res.status(500).send({message: 'Error en la peteción'});
          if(!prestamos) return res.status(404).send({message: 'No se ha podido calcular'});

          //un ciclo para recoger toda la base de datos e ir sumando los montos de los prestamos
            prestamos.forEach((prestamos) => {
            monto_original += prestamos.monto_original;
            monto_total += prestamos.monto_total;
          });
          infoPrestamo.monto_original = monto_original;
          infoPrestamo.monto_total = monto_total
          resolve(infoPrestamo);
      });
    });
  }

  async function ClientesActivos(totalCliente){

    let infoClientes = new Object;
    let clientes_activos = 0;

    return new Promise(resolve => {

       Cliente.find().exec((err, clientes) => {
      if(err) return res.status(500).send({message: 'Error en la peteción'});
      if(!clientes) return res.status(404).send({message: 'No se ha podido actualizar el cliente'});

      clientes.forEach((clientes) => {
        if(clientes.activo == 'true') clientes_activos++;
      });

        infoClientes.clientes_activos = clientes_activos;
        infoClientes.clientes_candidatos = totalCliente - clientes_activos;
        resolve(infoClientes);
      });

    });

  }

async function TicketsCompletados(TotalTickets){

  let infoTickets = new Object;
  let ticket_completados = 0;

  return new Promise(resolve => {

      Ticket.find().exec((err, ticket) => {
        if(err) return res.status(500).send({message: 'Error en la peteción'});
        if(!ticket) return res.status(404).send({message: 'No se ha podido actualizar el cliente'});

      ticket.forEach((ticket) => {
        if(ticket.estado == "COMPLETADO") ticket_completados++;
      });

      infoTickets.ticket_completados = ticket_completados;
      infoTickets.ticket_proceso = TotalTickets - ticket_completados;
      resolve(infoTickets);

    });

  });

}
