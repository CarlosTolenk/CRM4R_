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


                 prestamo.cliente = cliente;
                 prestamo.monto_original = params.monto_original;
                 prestamo.metodo_pago = params.metodo_pago;
                 prestamo.descripcion = params.descripcion;
                 prestamo.duracion = params.duracion;
                 prestamo.interes = interes.toFixed(4);
                 prestamo.garante = params.garante;
                 prestamo.monto_total = Math.round(monto_total);
                 prestamo.estado = "Pendiente";
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
                    ticket.prestamo = prestamoStore._id;
                    ticket.fecha = moment().format('LL');
                    ticket.votos = 0;

                    //Realizar la pre-seleccion del estado del ticket evaluando si es rentable o no el cliente
                    //Evaluar el 40% del salrio del cliente
                    let evaluacion = prestamo.cliente.salario * 0.40;
                    // Un perso
                    if(prestamo.cuotas <= evaluacion && prestamo.monto_original <= 30000){
                      if(prestamo.cliente.avg >= 65){
                        ticket.estado = "PRE-APROBADO";
                        ticket.votos++;
                      }else{
                        ticket.estado = "PRE-DENEGADO";
                      }
                    }

                    if(prestamo.cuotas <= evaluacion && prestamo.monto_original >= 30001 && prestamo.monto_original <= 50000){
                      if(prestamo.cliente.avg >= 75){
                        ticket.estado = "PRE-APROBADO";
                        ticket.votos++;
                      }else{
                        ticket.estado = "PRE-DENEGADO";
                      }
                    }

                    if(prestamo.cuotas <= evaluacion && prestamo.monto_original >= 50001 && prestamo.monto_original <= 80000){
                      if(prestamo.cliente.avg >= 85){
                        ticket.estado = "PRE-APROBADO";
                        ticket.votos++;
                      }else{
                        ticket.estado = "PRE-DENEGADO";
                      }
                    }

                    if(prestamo.cuotas <= evaluacion && prestamo.monto_original >= 80001){
                      if(prestamo.cliente.avg >= 90){
                        ticket.estado = "PRE-APROBADO";
                        ticket.votos++;
                      }else{
                        ticket.estado = "PRE-DENEGADO";
                      }
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
  let page = 1;

  if(req.params.page){
    page = req.params.page;
  }

  let itemsPerPage = 5;

  Prestamo.find().populate({path: 'cliente'}).paginate(page, itemsPerPage, (err, prestamos, total) => {
     if(err) return res.status(500).send({message: 'Error en la petición'});

     if(!prestamos) return status(404).send({message: 'No hay Prestamos disponibles'});

          return res.status(200).send({
            prestamos,
            total,
            pages: Math.ceil(total/itemsPerPage),
          });
      });
  };


exports.updatePrestamo = (req, res) => {

  let prestamoId = req.params.id;
  let params = req.body;
  let update;

  Prestamo.findById(prestamoId, (err, prestamo) => {
    if(err) return res.status(500).send({message: 'Error en la peteción'});


    if(params.monto_original > 0){
      let monto_originalNuevo = prestamo.monto_total + params.monto_original;
      console.log(monto_originalNuevo);
      let monto_totalNuevo = calculoPrestamo(monto_originalNuevo, params.duracion, params.metodo_pago);
      let interes = calculoInteres(monto_totalNuevo, monto_originalNuevo, params.duracion);
      let cuota = calculoCuota(monto_totalNuevo, params.metodo_pago, params.duracion);
      prestamo.monto_original = monto_originalNuevo;
      prestamo.monto_total = monto_totalNuevo;
      prestamo.metodo_pago = params.metodo_pago;
      prestamo.duracion = params.duracion;
      prestamo.interes = interes;
      prestamo.cuotas = cuota;
      update = prestamo;

    }else{
      let interes = calculoInteres(prestamo.monto_total, prestamo.monto_original, params.duracion);
      let cuota = calculoCuota(prestamo.monto_total, params.metodo_pago, params.duracion);
      prestamo.metodo_pago = params.metodo_pago;
      prestamo.duracion = params.duracion;
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
  if(metodo_pago == "dia"){
    let monto_total = monto_original * (Math.pow(1+(0.60/360), duracion));
    return monto_total;
  }
  if(metodo_pago == "semanal"){
    let monto_total = monto_original * (Math.pow(1+(0.65/360), duracion));
    return monto_total;
  }
  if(metodo_pago == "quincenal"){
    let monto_total = monto_original * (Math.pow(1+(0.68/360), duracion));
    return monto_total;
  }else{
    let monto_total = monto_original * (Math.pow(1+(0.70/360), duracion));
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
