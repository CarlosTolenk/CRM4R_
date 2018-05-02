import { Component, OnInit , DoCheck} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { ToastService } from '../../../services/toast-service.service';
import { ClienteService } from '../../../services/cliente.services';
import { PrestamosService } from '../../../services/prestamos.services';
import { Cliente } from '../../../models/cliente';
import { Prestamo } from '../../../models/prestamo';
import { GLOBAL } from '../../../services/global';
import { NgSelectModule } from '@ng-select/ng-select';

@Component({
  selector: 'app-agregar-prestamos',
  templateUrl: './agregar-prestamos.component.html',
  providers: [ClienteService,ToastService,PrestamosService],
  styleUrls: ['./agregar-prestamos.component..scss']
})
export class AgregarPrestamosComponent implements OnInit, DoCheck {

  public url:string;
  public prestamo:Prestamo;
  public listCliente: Cliente[];
  public status:String;
  public selectedCliente:String;
  public selectedFull:Cliente;
  public duracionP:Object;
  public totalDia;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _clienteService: ClienteService,
    private _prestamoService: PrestamosService,
    private _toastService: ToastService

  ){
    this.url = GLOBAL.url;
    this.prestamo = new Prestamo({cedula:''},'', '', 0 ,'','','',0,0,0,'',0 ,'','','');
    this.status = "false";
   }

  ngOnInit() {
    //Conseguir todos los datos del cliente
      this._clienteService.getClientes().subscribe(
            response => {
              if(!response.clientes){
                this.status = 'error';
              }else{
                this.listCliente = response.clientes;
                this.status = "true";
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

  }

  ngDoCheck(){
    if(this.status == "true"){
      for(let i=0; i<this.listCliente.length; i++){
        if( this.selectedCliente == this.listCliente[i].cedula ){
          this.selectedFull = this.listCliente[i];
          this.prestamo.cedula = this.selectedFull.cedula;
        }
      }
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

  }



    onSubmit(){

      switch(this.prestamo.metodo_pago){
        case 'Semanal':
               this.totalDia = this.prestamo.duracion*7;
               this.prestamo.duracion = this.totalDia;
              break;
        case 'Mensual':
                this.totalDia = this.prestamo.duracion*30;
                this.prestamo.duracion = this.totalDia;
                console.log(this.prestamo.duracion);
               break;
    }
      this._prestamoService.addPrestamo(this.prestamo).subscribe(
            response => {
              if(!response.ticket){
                this.status = 'error';
              }else{
                this._toastService.Success("El Préstamos se ha creado correctamente", "Acción Completada");
                this._router.navigate(['home/prestamos/ver', response.ticket.prestamo]);
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
