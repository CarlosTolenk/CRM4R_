import { Component, OnInit , ChangeDetectionStrategy, EventEmitter, ChangeDetectorRef} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { ToastService } from '../../../services/toast-service.service';
import { ClienteService } from '../../../services/cliente.services';
import { Cliente } from '../../../models/cliente';
import { Prestamo } from '../../../models/prestamo';
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
  public prestamo:Prestamo;
  public listCliente: Cliente[];
  public status:String;
  public selectedCliente:String;
  public selectedFull:Cliente;
  public duracionP:Object;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _clienteService: ClienteService,
    private _toastService: ToastService

  ){
    this.url = GLOBAL.url;
    // this.duracionP = {
    //   "diario": {
    //     "a" :46,
    //     "b" :60,
    //     "c" :90,
    //     "d" :120
    //   },
    //   "semanal":{
    //     "a": 10,
    //     "b": 13,
    //     "c": 15,
    //     "d": 20
    //   },
    //   "mensual":{
    //     "a" : 6,
    //     "b": 8,
    //     "c": 10,
    //     "d": 12
    //   }
    // }
    this.prestamo = new Prestamo("","",0,"","Diario", "",0,0,"",0,"",0,"","");
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


    switch(this.prestamo.metodo_pago){
      case 'Diario':
          this.duracionP = {
            "a" :'46 d',
             "b" :'60 d',
             "c" :'90 d',
             "d" :'120 d'
          };
          break;

      case 'Semanal':
          this.duracionP = {
            "a" :'10 s',
             "b" :'13 s',
             "c" :'15 s',
             "d" :'20 s'
          };
          break;

      case 'Mensual':
          this.duracionP = {
            "a" :'6 m',
             "b" :'8 m',
             "c" :'10 m',
             "d" :'12 m'
          };
          break;
    }
  }



  onsubmit(){
    console.log(this.prestamo);
  }





}
