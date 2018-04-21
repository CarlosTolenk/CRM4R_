import { Component, OnInit , ChangeDetectionStrategy, EventEmitter, ChangeDetectorRef} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ToastService } from '../../../services/toast-service.service';
import { ClienteService } from '../../../services/cliente.services';
import { Cliente } from '../../../models/cliente';
import { GLOBAL } from '../../../services/global';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-agregar-prestamos',
  templateUrl: './agregar-prestamos.component.html',
  providers: [ClienteService,ToastService],
  styleUrls: ['./agregar-prestamos.component..scss']
})
export class AgregarPrestamosComponent implements OnInit {

  public url:string;
  public listCliente: Cliente[];
  public status:String;
  public selectedCliente:String;
  public selectedFull:Cliente;




  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _clienteService: ClienteService,
    private _toastService: ToastService

  ){
    this.url = GLOBAL.url;

   }

  ngOnInit() {
    //Conseguir todos los datos del cliente
      this._clienteService.getClientes().subscribe(
            response => {
              if(!response.clientes){
                this.status = 'error';
              }else{
                this.listCliente = response.clientes;
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
    for(let i=0; i<this.listCliente.length; i++){
      if( this.selectedCliente === this.listCliente[i].cedula ){
        this.selectedFull = this.listCliente[i];
      }
    }
  }

  onsubmit(){

  }





}
