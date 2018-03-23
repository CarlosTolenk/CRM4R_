import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ClienteService } from '../../../services/cliente.services';
import { Cliente } from '../../../models/cliente';
import { GLOBAL } from '../../../services/global';
// import {
//     ReactiveFormsModule,
//     FormsModule,
//     FormGroup,
//     FormControl,
//     Validators,
//     FormBuilder
// } from '@angular/forms';

@Component({
  selector: 'app-agregarcliente',
  templateUrl: './agregarcliente.component.html',
  providers: [ClienteService],
  styleUrls: ['./agregarcliente.component.css']
})
export class AgregarClienteComponent implements OnInit {
  public cliente:Cliente;
  public status:string;
  // public myform: FormGroup;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _clienteService: ClienteService
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
           // this.myform.reset();
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
    this._router.navigate(['home/clientes']);
  }

}
