export class Comentario {
  constructor(
    public team:any,
    public ticket:any,
    public texto:String,
    public accion_voto:any
  ){}
}


// team: {type: Schema.Types.ObjectId, ref: 'Team'},
// ticket: {type: Schema.Types.ObjectId, ref: 'Ticket'},
// texto: String,
// accion_voto:Boolean
