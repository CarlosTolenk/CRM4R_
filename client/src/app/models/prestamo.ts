export class Prestamo {
  constructor(
    public cliente:{
      cedula:String
    },
    public _id: String,
    public cedula:String,    
    public monto_original: number,
    public tipo:String,
    public metodo_pago: String,
    public descripcion: String,
    public duracion: number,
    public interes: number,
    public monto_total: number,
    public estado: String,
    public cuotas: number,
    public fecha: String,
    public garantia: String,
    public referencia:String
  ){}
}
