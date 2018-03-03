//Para poder tener acceso a las nuevas novedades de Javascript
'use strict'
// Registrar los controladores para los modelos
const Cliente = require('../models/clientes');
const Prestamo = require('../models/prestamos');
//Requerir modulos necesarios para las funciones
const mongoosePaginate = require('mongoose-pagination');
const moment = require('moment');

//Este método salva el pago de los clientes
exports.saveCierre = (req, res) => {

  let prestamoId = req.params.id;
  let pago_realizado = req.body.pago_realizado;
  let abono = req.body.abono;
  let fecha = moment().format('LL');

  Prestamo.findById(prestamoId).populate({path: 'cliente'}).exec((err, prestamo, total) => {
     if(err) return res.status(500).send({message: 'Error en la petición'});

     if(!prestamo) return status(404).send({message: 'No hay Prestamos disponibles'});

     if(pago_realizado == "true"){
       realizarPago(prestamo, abono);
       return res.status(200).send({message: 'El cliente ha pagado'});
     }else{
       return res.status(200).send({message: 'El cliente NO ha pagado'});
     }

  });

};

async function realizarPago(prestamo, abono){

  let monto_total = prestamo.monto_total;
  let cuota = prestamo.cuotas;

  if(cuota - abono <= 0){
      //Pagoo totalmente la cuota
      prestamo.monto_total = prestamo.monto_total - cuota;
      prestamo.cliente.avg++;

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
      console.log("Perfecto");
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

      console.log("Aun debe");
  }






}
