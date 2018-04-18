import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ClienteService } from '../../../services/cliente.services';
import { ToastService } from '../../../services/toast-service.service';
import { Cliente } from '../../../models/cliente';
import { GLOBAL } from '../../../services/global';


@Component({
  selector: 'app-agregarcliente',
  templateUrl: './agregarcliente.component.html',
  providers: [ClienteService, ToastService],
  styleUrls: ['./agregarcliente.component.css']
})
export class AgregarClienteComponent implements OnInit {
  public cliente:Cliente;
  public status:string;


  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _clienteService: ClienteService,
    private _toastService: ToastService
  ) {
    this.cliente = new Cliente('', '', '', '', '', '', '', 0, '', '', '', 0, '', 0, '', '');
   }

  ngOnInit() {
  }

  onSubmit(){
     this._clienteService.addCliente(this.cliente).subscribe(
       response => {
         if(!response.cliente){
           this.status = 'error';
         }else{
           this.cliente = response.cliente;
           this.status = 'success';
           this._toastService.Success("El cliente se ha sido creado correctamente", "Acción Completada");
             this._router.navigate(['home/clientes/ver/', this.cliente._id]);
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

  volverListar(){
    console.log('Presionando');
    this._router.navigate(['home/clientes']);
  }

}
