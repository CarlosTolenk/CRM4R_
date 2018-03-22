export class Cliente {
  constructor(
    public _id: String,
    public nombre: String,
    public apellido: String,
    public cedula: String,
    public direccion: String,
    public avatar: String,
    public ocupacion: String,
    public salario: Number,
    public telefono: String,
    public trabajo: String,
    public descripcion: String,
    public score: Number,
    public activo: String,
    public avg: Number,
    public fecha: String,
    public data_credito: String
  ){}
}

/*
  nombre: String,
  apellido: String,
  email: String,
  cedula: String,
  direccion: String,
  avatar: String,
  ocupacion: String,
  salario: Number,
  descripcion: String,
  scoreData: Number,
  avg: Number,
  fecha: Date,
  data_credito: {type : Schema.Types.ObjectId, ref : 'DataCredito'}


*/
