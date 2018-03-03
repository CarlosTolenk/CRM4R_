//Para poder tener acceso a las nuevas novedades de Javascript
'use strict'
// Registrar los controladores para los modelos
const Cliente = require('../models/clientes');
const Prestamo = require('../models/prestamos');
const Cierre = require('../models/cierres');
//Requerir modulos necesarios para las funciones
const mongoosePaginate = require('mongoose-pagination');
const moment = require('moment');

//Este método salva el pago de los clientes y generar una historial del pago del cliente
exports.saveCierre = (req, res) => {

  let cierre = new Cierre();
  let prestamoId = req.params.id;
  let pago_realizado = req.body.pago_realizado;
  let abono = req.body.abono;
  let fecha = moment().format('LL');

  Prestamo.findById(prestamoId).populate({path: 'cliente'}).exec((err, prestamo) => {
     if(err) return res.status(500).send({message: 'Error en la petición de búsqueda del préstamo'});
     if(!prestamo){
       return res.status(404).send({message: 'No hay Prestamos disponibles'});
     } else{
         if(pago_realizado == "true"){
           realizarPago(prestamo, abono);
           console.log('Entrando a realizar los calculos');
           //Salvar todos los datos del pago para generar un historial
           cierre.prestamo = prestamo._id;
           cierre.cliente = prestamo.cliente._id;
           cierre.pago_realizado = true;
           cierre.abono = abono;
           cierre.fecha = fecha;

           if(prestamo.cuotas - abono <= 0){
             cierre.completado = true;
           }else{
             cierre.completado = false;
           }

              cierre.save((err, cierreStore) => {
              console.log('Tengo la información del historial');
               if(err) return res.status(500).send({message: 'Error en la petición de salvar el pago del cliente'});
               if(cierreStore){
                 return res.status(200).send({cierre: cierreStore});
               }else{
                 return res.status(404).send({message: 'No se ha podido registrar el nuevo pago del cliente'});
               }
             });

         }else{

           realizarMora(prestamo);
           console.log('Entrando a realizar los calculos mora');
           //Salvar todos los datos del pago para generar un historial
           cierre.prestamo = prestamo._id;
           cierre.cliente = prestamo.cliente._id;
           cierre.pago_realizado = true;
           cierre.completado = false;
           cierre.abono = abono;
           cierre.fecha = fecha;

             cierre.save((err, cierreStore) => {
             console.log('Tengo la información del historial');
              if(err) return res.status(500).send({message: 'Error en la petición de salvar el pago del cliente'});
              if(cierreStore){
                return res.status(200).send({cierre: cierreStore});
              }else{
                return res.status(404).send({message: 'No se ha podido registrar el nuevo pago del cliente'});
              }
            });


           //return res.status(200).send({message: 'El cliente NO ha pagado'});
         }
      }
  });

};



//Funcionar para calcular el pago del cliente y los moras
 function realizarPago(prestamo, abono){

  let monto_total = prestamo.monto_total;
  let cuota = prestamo.cuotas;

  if(cuota - abono <= 0){
      //Pagoo totalmente la cuota
      prestamo.monto_total = prestamo.monto_total - cuota;
      prestamo.cliente.avg++;

      //Aumentarle al avg al cliente por su pago realizado
      Cliente.findByIdAndUpdate(prestamo.cliente._id, {avg: prestamo.cliente.avg}, {new:true}, (err, clienteUpdated) => {
        if(err) return console.log(err);
        if(!clienteUpdated) return console.log('No se ha podido actualizar el cliente');
      // console.log(clienteUpdated);
     });
     //Restarle al monto total el pago que el cliente ha aportado
       Prestamo.findByIdAndUpdate(prestamo._id, {monto_total: prestamo.monto_total}, {new:true}, (err, prestamoUpdated) =>{
       if(err) return console.log(err);
       if(!prestamoUpdated) return console.log('No se ha podido actualizar el prestamo');
       // console.log(prestamoUpdated);
     });

  }else{
        //Si no pagoo completamente la cuota y se le  recarga una mora
        let diferencia = prestamo.cuotas - abono;
        let mora = diferencia * 0.20;
        prestamo.monto_total -= abono;
        prestamo.monto_total += mora;
        prestamo.cliente.avg -= 0.5;

        Cliente.findByIdAndUpdate(prestamo.cliente._id, {avg: prestamo.cliente.avg}, {new:true}, (err, clienteUpdated) => {
           if(err) return console.log(err);
           if(!clienteUpdated) return console.log('No se ha podido actualizar el cliente');
         //  return console.log(clienteUpdated);
        });

        Prestamo.findByIdAndUpdate(prestamo._id, {monto_total: prestamo.monto_total}, {new:true}, (err, prestamoUpdated) =>{
          if(err) return console.log(err);
          if(!prestamoUpdated) return console.log('No se ha podido actualizar el prestamo');
         // return console.log(prestamoUpdated);
        });
    }
}


//Realizar mora cuando el cliente no ha pagado nada
function realizarMora(prestamo){

  let monto_total = prestamo.monto_total;
  let cuota = prestamo.cuotas;
  let mora = cuota * 0.05;
  prestamo.monto_total += mora;
  prestamo.cliente.avg -= 2;

  //Actualizar el avg del cliente
  Cliente.findByIdAndUpdate(prestamo.cliente._id, {avg: prestamo.cliente.avg}, {new:true}, (err, clienteUpdated) => {
     if(err) return console.log(err);
     if(!clienteUpdated) return console.log('No se ha podido actualizar el cliente');
    console.log(clienteUpdated);
  });

  //Actualizar el préstamo del cliente
  Prestamo.findByIdAndUpdate(prestamo._id, {monto_total: prestamo.monto_total}, {new:true}, (err, prestamoUpdated) =>{
    if(err) return console.log(err);
    if(!prestamoUpdated) return console.log('No se ha podido actualizar el prestamo');
    console.log(prestamoUpdated);
  });
}



// Generar un historial del préstamo
exports.getHistorial = (req, res) => {

  let prestamoId = req.params.id;

  Cierre.find({ prestamo: prestamoId }).populate({path: 'prestamo cliente'}).exec((err, cierre) => {
     if(err) return res.status(500).send({message: 'Error en la petición'});

     if(!cierre) return status(404).send({message: 'No hay Prestamos disponibles'});

          return res.status(200).send({ cierre });
      });
  };
