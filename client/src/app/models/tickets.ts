export class Ticket{
  constructor(
    public _id: String,
    public tipo: String,
    public cliente: Object,
    public prestamo: Object,
    public votos: Number,
    public estado: String,
    public fecha: String
  ){}
}


//Backend
// tipo: String,
// descripcion: String,
// cliente: {type: Schema.Types.ObjectId, ref: 'Cliente'},
// prestamo: {type: Schema.Types.ObjectId, ref: 'Prestamo'},
// votos: Number,
// estado: String,
// fecha: Date
