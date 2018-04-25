export class Prestamo {
  constructor(
    public _id: String,
    public cedula: String,
    public monto_original: Number,
    public tipo:String,
    public metodo_pago: String,
    public descripcion: String,
    public duracion: number,
    public interes: Number,
    public garante: String,
    public monto_total: Number,
    public estado: String,
    public cuotas: Number,
    public fecha: String,
    public garantia: String
  ){}
}
