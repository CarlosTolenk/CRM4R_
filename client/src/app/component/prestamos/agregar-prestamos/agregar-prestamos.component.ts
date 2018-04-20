import { Component, OnInit , ChangeDetectionStrategy, EventEmitter, ChangeDetectorRef} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ClienteService } from '../../../services/cliente.services';
import { Cliente } from '../../../models/cliente';
import { GLOBAL } from '../../../services/global';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-agregar-prestamos',
  templateUrl: './agregar-prestamos.component.html',
  providers: [ClienteService],
  styleUrls: ['./agregar-prestamos.component..scss']
})
export class AgregarPrestamosComponent implements OnInit {

  public listCliente: Cliente[];
  public status:String;
  public selectedCliente:Object;
  // public nombre_completo:[];


  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _clienteService: ClienteService

  ){

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





}
