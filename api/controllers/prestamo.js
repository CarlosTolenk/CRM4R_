//Para poder tener acceso a las nuevas novedades de Javascript
'use strict'
// Registrar los controladores para los modelos
const Cliente = require('../models/clientes');
const Prestamo = require('../models/prestamos');
const Ticket = require('../models/tickets');
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
  let ticket = new Ticket();
  let update;
  let clienteId;

  //Busco en la base de dato la cédula del cliente para obtener toda su información
  Cliente.findOne({ cedula: params.cedula })
          //Relleno todo los datos del cliente en la variable result
         .populate('Cliente')
           .exec((err, cliente) => {
             if(err) return res.status(500).send({message: 'Error en la petición del cliente para el  Prestamo'});
             if(cliente){


                //Hacer todos los calculos y guardarlo en variables para luego guardarlo en base de datos
                 let monto_total = calculoPrestamo(params.monto_original, params.duracion, params.metodo_pago);
                 let interes = calculoInteres(monto_total, params.monto_original, params.duracion);
                 let cuota = calculoCuota(monto_total, params.metodo_pago, params.duracion);

                 //Generar numero random 3030
                 let referencia = generateUUID(params.metodo_pago);
                 // });

                 prestamo.cliente = cliente;
                 prestamo.referencia = referencia;
                 prestamo.monto_original = params.monto_original;
                 prestamo.metodo_pago = params.metodo_pago;
                 prestamo.descripcion = params.descripcion;
                 prestamo.duracion = params.duracion;
                 prestamo.interes = interes.toFixed(4);
                 prestamo.garante = params.garante;
                 prestamo.garantia = params.garantia;
                 prestamo.monto_total = Math.round(monto_total);
                 prestamo.estado = "PENDIENTE";
                 prestamo.tipo = params.tipo;
                 prestamo.cuotas = Math.round(cuota);
                 prestamo.fecha = moment().format('LL');

                 //Aplicar el método para salvar todos los datos del préstamo y el cliente vinculado
                 prestamo.save((err, prestamoStore) => {
                   if(err) return res.status(500).send({message: 'Error al guardar el nuevo prestamo'});

                   if(prestamoStore){
                    // res.status(200).send({prestamo: prestamoStore});
                   }else{
                     res.status(404).send({message: 'No se ha podido registrar el nuevo Prestamo'});
                   }

                    //Crear el ticket que se genera con la creación del préstamo
                    ticket.tipo = "Prestamo";
                    ticket.descripcion = "Solicitud de Préstamo de " + prestamo.cliente.nombre + " " + prestamo.cliente.apellido;
                    ticket.cliente = prestamo.cliente.nombre + " " + prestamo.cliente.apellido;
                    ticket.prestamo = prestamoStore._id;
                    ticket.fecha = moment().format('LL');
                    ticket.votos = 0;

                    //Realizar la pre-seleccion del estado del ticket evaluando si es rentable o no el cliente
                    //Evaluar el 40% del salrio del cliente
                    let evaluacion = prestamo.cliente.salario * 0.40;
                    // Un perso
                    if(prestamo.cuotas <= evaluacion && prestamo.monto_original <= 20000){
                      if(prestamo.cliente.avg >= 40){
                        ticket.pre_estado = "PRE-APROBADO";
                        ticket.estado = "PRE-APROBADO";
                        ticket.votos++;
                      }else{
                        ticket.estado = "PRE-DENEGADO";
                        ticket.pre_estado = "PRE-DENEGADO";
                      }
                    }

                    if(prestamo.cuotas <= evaluacion && prestamo.monto_original >= 20001 && prestamo.monto_original <= 40000){
                      if(prestamo.cliente.avg >= 45){
                        ticket.estado = "PRE-APROBADO";
                        ticket.pre_estado = "PRE-APROBADO";
                        ticket.votos++;
                      }else{
                        ticket.estado = "PRE-DENEGADO";
                        ticket.pre_estado = "PRE-DENEGADO";
                      }
                    }

                    if(prestamo.cuotas <= evaluacion && prestamo.monto_original >= 40001 && prestamo.monto_original <= 60000){
                      if(prestamo.cliente.avg >= 50){
                        ticket.estado = "PRE-APROBADO";
                        ticket.pre_estado = "PRE-APROBADO";
                        ticket.votos++;
                      }else{
                        ticket.estado = "PRE-DENEGADO";
                        ticket.pre_estado = "PRE-DENEGADO";
                      }
                    }

                    if(prestamo.cuotas <= evaluacion && prestamo.monto_original >= 70001 && prestamo.monto_original <= 90000){
                      if(prestamo.cliente.avg >= 70){
                        ticket.estado = "PRE-APROBADO";
                        ticket.pre_estado = "PRE-APROBADO";
                        ticket.votos++;
                      }else{
                        ticket.estado = "PRE-DENEGADO";
                        ticket.pre_estado = "PRE-DENEGADO";
                      }
                    }

                    if(prestamo.cuotas <= evaluacion && prestamo.monto_original > 90001){
                      if(prestamo.cliente.avg >= 80){
                        ticket.estado = "PRE-APROBADO";
                        ticket.pre_estado = "PRE-APROBADO";
                        ticket.votos++;
                      }else{
                        ticket.estado = "PRE-DENEGADO";
                        ticket.pre_estado = "PRE-DENEGADO";
                      }
                    }

                    if(prestamo.cuotas > evaluacion){
                      ticket.estado = "PRE-DENEGADO";
                      ticket.pre_estado = "PRE-DENEGADO";
                    }

                    update = cliente;
                    Cliente.findByIdAndUpdate(update._id, { activo: 'true'}, {new: true}, (err, clienteUpdated) => {
                      if(err) return res.status(500).send({message: 'Error en la peteción'});


                      if(!clienteUpdated) return res.status(404).send({message: 'No se ha podido actualizar el miembro del equipo'});
                      console.log(clienteUpdated);
                    });


                    ticket.save((err, ticketStore) => {
                      if(err) return res.status(500).send({message: 'Error al guardar el nuevo ticket'});

                      if(ticketStore){
                        res.status(200).send({ticket: ticketStore});
                      }else{
                        res.status(404).send({message: 'No se ha podido registrar el nuevo Ticket'});
                      }
                    }); //save ticket
                 }); //save préstamo
               }else{
                 return res.status(404).send({message: 'Error, ese cliente no existe'});
               }
             }); //.exec


};

//Listar todos los préstamos por páginas
exports.getPrestamos  = (req, res) => {

  Prestamo.find().populate({path: 'cliente'}).exec((err, prestamos, total) => {
     if(err) return res.status(500).send({message: 'Error en la petición'});

     if(!prestamos) return status(404).send({message: 'No hay Prestamos disponibles'});

          return res.status(200).send({prestamos});
      });
  };


  //Obtener la información del Prestamo
  exports.getPrestamo = (req, res) => {
      //Guardar el id que nos llega por la url
      let prestamoId = req.params.id;

      Prestamo.findById(prestamoId).populate({path: 'cliente'}).exec((err, prestamo) => {
        if(err) return res.status(500).send({message: 'Error en la peteción'});

        if(!prestamo) return res.status(404).send({message: 'Usuario no existe'});

        return res.status(200).send({prestamo});
      });
  };


exports.updatePrestamo = (req, res) => {

  let prestamoId = req.params.id;
  let params = req.body;
  let update;


  Prestamo.findById(prestamoId, (err, prestamo) => {
    if(err) return res.status(500).send({message: 'Error en la peteción'});


    if(params.monto_original >= 1){
      console.log("Nuevo Monto Enviado:" + params.monto_original);
      console.log("Monto Total Antiguo: " + prestamo.monto_total);
      let monto_Nuevo = calcularNuevoMonto(params.monto_original, prestamo.monto_total);
      console.log("Nuevo Monto Original" + monto_Nuevo);
      let monto_totalNuevo = calculoPrestamo(monto_Nuevo, params.duracion, params.metodo_pago);
      console.log("Total con intereses:" + monto_totalNuevo);
      let interes = calculoInteres(monto_totalNuevo, monto_Nuevo, params.duracion);
      let cuota = calculoCuota(monto_totalNuevo, params.metodo_pago, params.duracion);
      prestamo.monto_original = monto_Nuevo;
      prestamo.monto_total = monto_totalNuevo;
      prestamo.metodo_pago = params.metodo_pago;
      prestamo.tipo =  params.tipo;
      prestamo.garantia = params.garantia;
      //descripcion
      prestamo.descripcion = params.descripcion;
      prestamo.duracion = params.duracion;
      prestamo.interes = interes;
      prestamo.cuotas = cuota;
      update = prestamo;

    }else{
      let interes = calculoInteres(prestamo.monto_total, prestamo.monto_original, params.duracion);
      let cuota = calculoCuota(prestamo.monto_total, params.metodo_pago, params.duracion);
      prestamo.metodo_pago = params.metodo_pago;
      prestamo.duracion = params.duracion;
      prestamo.descripcion = params.descripcion;
      prestamo.metodo_pago = params.metodo_pago;
      prestamo.tipo =  params.tipo;
      prestamo.garantia = params.garantia;
      prestamo.interes = interes;
      prestamo.cuotas = cuota;
      update = prestamo;
    }
    Prestamo.findByIdAndUpdate(prestamoId, update, {new: true}, (err, prestamoUpdated) => {
      if(err) return res.status(500).send({message: 'Error en la peteción'});

      if(!prestamoUpdated) return res.status(404).send({message: 'No se ha podido actualizar el préstamo'});

       return res.status(200).send({prestamo: prestamoUpdated});
    });
  });

};

exports.destroyPrestamo = (req, res) => {

  Prestamo.findById(req.params.id, (err, prestamo) => {
    if(err) return res.status(500).send({message: 'Error en la peteción'});

    if(prestamo.estado == "Denegado"){
      Prestamo.remove({_id: req.params.id}, (error) => {
         if(error){
            return res.status(500).send({message: 'Error al eliminar el préstamo'});
         }else{
            return res.status(200).send({message: 'Eliminado correctamente el préstamo'});
         }
      });
    }else{
      return res.status(404).send({message: 'Este préstamo aún no se puede borrar'});
    }
  });
};


//Función para cálcular el monto todal que el cliente va a pagar tomando como parámetros los ingresados.
function calculoPrestamo(monto_original, duracion, metodo_pago){
  if(metodo_pago == "Diario"){
    let monto_total = monto_original * (Math.pow(1+(0.50/360), duracion));
    return monto_total;

  }
  if(metodo_pago == "Semanal"){
    let monto_total = monto_original * (Math.pow(1+(0.55/360), duracion));
    return monto_total;
  }

  if(metodo_pago == "Mensual"){
    let monto_total = monto_original * (Math.pow(1+(0.30/360), duracion));
    console.log("El monto original es: " + monto_total);
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
  if(metodo_pago == "Diario"){
    let cuota = monto_total/duracion;
    return cuota;
  }
  if(metodo_pago == "Semanal"){
    let duracion_semana = duracion/7;
    let cuota = monto_total/duracion_semana;
    return cuota;
  }
  if(metodo_pago == "Mensual"){
    let duracion_mensual = duracion/30;
    let cuota = monto_total/duracion_mensual;
    return cuota;
  }
}

function calcularNuevoMonto(monto_original, monto_totalAnterior){
  let num1 = parseInt(monto_original);
  let num2 =  parseInt(monto_totalAnterior);
  let total = num1 + num2;
  return total;
}


function generateUUID(metodo_pago) {
    let d = new Date();

    if(metodo_pago == "Diario"){
      let uuid = '01-';
      uuid += d.getMonth() + 1;
      uuid += d.getDay();
      uuid += d.getSeconds();
      uuid += d.getFullYear() - 2000;
      uuid += d.getHours() + Math.floor(Math.random() * 11);
      return uuid;
    }
    if(metodo_pago == "Semanal"){
      let uuid = '02-';
      uuid += d.getMonth() + 1;
      uuid += d.getDay();
      uuid += d.getSeconds();
      uuid += d.getFullYear() - 2000;
      uuid += d.getHours() + Math.floor(Math.random() * 11);
      return uuid;
    }
    if(metodo_pago == "Mensual"){
      let uuid = '03-';
      uuid += d.getMonth() + 1;
      uuid += d.getDay();
      uuid += d.getSeconds();
      uuid += d.getFullYear() - 2000;
      uuid += d.getHours() + Math.floor(Math.random() * 11);
      return uuid;
    }



}
