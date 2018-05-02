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
//466 520

@Component({
  selector: 'app-editar-prestamos',
  templateUrl: './editar-prestamos.component.html',
  providers: [ToastService,PrestamosService,ClienteService],
  styleUrls: ['./editar-prestamos.component..scss']
})
export class EditarPrestamosComponent implements OnInit {
  public cliente:Cliente;
  public prestamo:Prestamo;
  public status:string;
  public url:string;
  public reajuste:boolean;
  public duracionP:Object;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _clienteService: ClienteService,
    private _prestamoService: PrestamosService,
    private _toastService: ToastService
  ) {
    this.cliente = new Cliente('', '', '', '', '', '', '', 0, '', '', '', 0, '', 0, '', '');
    this.prestamo = new Prestamo({cedula:''},'', '', 0 ,'','','',0,0,0,'',0 ,'','','');
    this.url = GLOBAL.url;
    this.reajuste = false;
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
          }
          this.prestamo.monto_original = 0;
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
  }

  ngDoCheck(){
    switch(this.prestamo.metodo_pago){
      case 'Diario':
          this.duracionP = {
            "a" :46,
             "b" :60,
             "c" :90,
             "d" :120,
             "simbolo":'d'
          };
          break;

      case 'Semanal':
          this.duracionP = {
            "a" :10,
             "b" :13,
             "c" :15,
             "d" :20,
            "simbolo":'s'
          };
          break;

      case 'Mensual':
          this.duracionP = {
            "a" :6,
             "b" :8,
             "c" :10,
             "d" :12,
             "simbolo":'m'
          };
          break;
    }
  }

  onSubmit(){
      switch(this.prestamo.metodo_pago){
        case 'Semanal':
               let totalDia = this.prestamo.duracion*7;
               this.prestamo.duracion = totalDia;
              break;
        case 'Mensual':
                let totalDias = this.prestamo.duracion*30;
                this.prestamo.duracion = totalDias;
               break;
      }
      console.log(this.prestamo);
      this._prestamoService.updatePrestamo(this.prestamo).subscribe(
            response => {
              if(!response.prestamo){
                this.status = 'error';
              }else{
                this._toastService.Success("El Préstamos se ha actualizado correctamente", "Acción Completada");
                this._router.navigate(['home/prestamos/ver', this.prestamo._id]);
             }

            },
            error => {
                  var errorMessage = <any>error;
                  console.log(errorMessage);
                  if(errorMessage != null){
                    this.status = 'error';
                    this._toastService.Error("El Préstamos no se ha creado correctamente", "Error");
                }
            }
        );
  }

  volverListar(){
    this._router.navigate(['home/prestamos']);
  }

}
