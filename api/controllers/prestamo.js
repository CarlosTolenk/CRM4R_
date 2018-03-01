//Para poder tener acceso a las nuevas novedades de Javascript
'use strict'
// Registrar los controladores para los modelos
const Cliente = require('../models/clientes');
const Prestamo = require('../models/prestamos');
//Requerir modulos necesarios para las funciones
const mongoosePaginate = require('mongoose-pagination');
const moment = require('moment');

//Método para hacer el registro de los miembros del equipo
exports.addPrestamo = (req, res, next) => {

  //Recoger toda la informacion de la peticion
  let params = req.body;
  //Instanciar una variable para el cliente y los datos del préstamo
  let prestamo = new Prestamo();
  let cliente = new Cliente();

  //Busco en la base de dato la cédula del cliente para obtener toda su información
  Cliente.findOne({ cedula: params.cedula })
          //Relleno todo los datos del cliente en la variable result
         .populate('Cliente')
           .exec((err, result) => {
             if(err) return res.status(500).send({message: 'Error en la petición del cliente para el  Prestamo'});

             //Hacer todos los calculos y guardarlo en variables para luego guardarlo en base de datos
             let monto_total = calculoPrestamo(params.monto_original, params.duracion, params.metodo_pago);
             let interes = calculoInteres(monto_total, params.monto_original, params.duracion);
             let cuota = calculoCuota(monto_total, params.metodo_pago, params.duracion);

             prestamo.cliente = result;
             prestamo.monto_original = params.monto_original;
             prestamo.metodo_pago = params.metodo_pago;
             prestamo.duracion = params.duracion;
             prestamo.interes = interes;
             prestamo.garante = params.garante;
             prestamo.monto_total = monto_total;
             prestamo.estado = "En Proceso";
             prestamo.cuotas = cuota;
             prestamo.fecha = moment().format('LL');

             //Aplicar el método para salvar todos los datos del préstamo y el cliente vinculado
             prestamo.save((err, prestamoStore) => {
               if(err) return res.status(500).send({message: 'Error al guardar el nuevo prestamo'});

               if(prestamoStore){
                 res.status(200).send({prestamo: prestamoStore});
               }else{
                 res.status(404).send({message: 'No se ha podido registrar el nuevo Prestamo'});
               }
             }); //save
           }); //.exec

};





//Función para cálcular el monto todal que el cliente va a pagar tomando como parámetros los ingresados.
function calculoPrestamo(monto_original, duracion, metodo_pago){
  if(metodo_pago == "dia"){
    let monto_total = monto_original * (Math.pow(1+(0.6/360), duracion));
    return monto_total;
  }else{
    let monto_total = monto_original * (Math.pow(1+(0.65/360), duracion));
    return monto_total;
  }

}
//Función para cálcular los intereses del préstamo
function calculoInteres(total_monto, monto_original, duracion){
  let interes = (-1 + Math.pow((total_monto/monto_original), (1/duracion)))*100;
  return interes;
}

//Función para cálcular las cuotas que el cliente va a efectuar
function calculoCuota(monto_total, metodo_pago, duracion){
  if(metodo_pago == "dia"){
    let cuota = monto_total/duracion;
    return cuota;
  }else{
    let duracion_semana = duracion/7;
    let cuota = monto_total/duracion_semana;
    return cuota;
  }
}
