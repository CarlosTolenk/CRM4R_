//Para poder tener acceso a las nuevas novedades de Javascript
'use strict'
// Registrar los controladores para los modelos
const Recurso = require('../models/recursos');

//Requerir modulos necesarios para las funciones
const fs = require('fs');
const path = require('path');

exports.addRecurso = (req, res) => {

  let params = req.body;
  let recurso = new Recurso();
    if(req.files){
      // console.log(req.files);
        var file_path = req.files.archivo.path;
    // console.log(file_path);
        var file_split = file_path.split('\\');
      //  console.log(file_split);
        var file_name = file_split[3];
    //    console.log(file_name);
        var ext_split = file_name.split('\.');
        var file_ext = ext_split[1];
      //  console.log(file_ext);

        recurso.tipo = params.tipo;
        recurso.descripcion = params.descripcion;
        recurso.archivo = file_name;

        //Guardar un recurso al CRM

        recurso.save((err, recursoStore) => {
          if(err) return res.status(500).send({message: 'Error al guardar el nuevo comentario'});

          if(recursoStore){
            res.status(200).send({ticket: recursoStore});
          }else{
            res.status(404).send({message: 'No se ha podido registrar el nuevo comentario'});
          }
        });

    }else{
      return res.status(200).send({message: 'No se han subido archivos'});
    }

};


exports.getRecurso = (req, res) => {

  let recurso = req.params.recursoFile;
  console.log(recurso);
  let path_file = 'api/uploads/recursos/' + recurso;
  console.log(path_file);

  fs.exists(path_file, (exists) => {
    if(exists){
      res.sendFile(path.resolve(path_file));
    }else{
      res.status(200).send({message: 'No existe el archivo..'});
    }
  });
};
