import { Component, OnInit } from '@angular/core';
import { DatePipe, DeprecatedCurrencyPipe } from '@angular/common';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ClienteService } from '../../../services/cliente.services';
import { PrestamosService } from '../../../services/prestamos.services';
import { ToastService } from '../../../services/toast-service.service';
import { Cliente } from '../../../models/cliente';
import { Prestamo } from '../../../models/prestamo';
import { TablaM } from '../../../models/tablaM';
import { GLOBAL } from '../../../services/global';

@Component({
  selector: 'app-ver-prestamos',
  templateUrl: './ver-prestamos.component.html',
  providers: [ToastService,PrestamosService,ClienteService ],
  styleUrls: ['./ver-prestamos.component..scss']
})
export class VerPrestamosComponent implements OnInit {
  public cliente:Cliente;
  public prestamo:Prestamo;
  public status:string;
  public url:string;
  public amortizacion:TablaM;
  public tabla: TablaM[];
  public stateTabla:boolean;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _clienteService: ClienteService,
    private _prestamoService: PrestamosService,
    private _toastService: ToastService
  ) {
    this.cliente = new Cliente('', '', '', '', '', '', '', 0, '', '', '', 0, '', 0, '', '');
    this.prestamo = new Prestamo("","",0,"","Diario", "",0,0,"",0,"",0,"","");
    this.url = GLOBAL.url;
    this.tabla = new Array<TablaM>();
    this.stateTabla = true;
   }

  ngOnInit() {
    // Petición de la información del préstamo
    this._route.params.subscribe(res => {
      this._prestamoService.getPrestamo(res.id).subscribe(
        response => {
          if(!response.prestamo){
            this.status = 'error';
          }else{
            this.prestamo = response.prestamo;
            if(this.prestamo.metodo_pago == 'Semanal'){
              this.prestamo.duracion = this.prestamo.duracion/7;
            }
            if(this.prestamo.metodo_pago == 'Mensual'){
              this.prestamo.duracion = this.prestamo.duracion/30;
            }


            // console.log(this.prestamo);
          }

        },
        error => {
              var errorMessage = <any>error;
              console.log(errorMessage);
              if(errorMessage != null){
                this.status = 'error';
            }
        }

      );
    });



        // console.log(this.tabla);
  }



  generarTabla(){
    if(this.stateTabla){
      let numCuota = Math.round(this.prestamo.monto_total/this.prestamo.cuotas);
      let capital = Math.round(this.prestamo.monto_total - (this.prestamo.monto_total*this.prestamo.interes));
      let interes = Math.round(this.prestamo.monto_total*this.prestamo.interes);

        for (let i = 0; i <= numCuota; i++) {
          let monto_t = this.prestamo.monto_total - (this.prestamo.cuotas*i);
          let capital = Math.round(monto_t - (monto_t*this.prestamo.interes));
          let interes = monto_t*this.prestamo.interes;
          let inT = interes.toFixed(2);

            this.tabla.push(new TablaM(
                this.prestamo.cuotas,
                inT,
                capital,
                monto_t
            ));

            if(i==numCuota){
              if(monto_t < this.prestamo.cuotas){
                let nuevaCuota = this.prestamo.cuotas + monto_t;
                this.tabla[i].cuota = nuevaCuota;
                this.tabla[i].saldoCapital = 0;
              }else{
                this.tabla[i].cuota = monto_t;
                this.tabla[i].saldoCapital = 0;
              }
            }
            this.stateTabla = false;
      }
   }
}


  volverListar(){
    this._router.navigate(['home/prestamos']);
  }

}
