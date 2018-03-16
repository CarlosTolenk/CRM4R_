import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ClienteService } from '../../services/cliente.services';
import { Cliente } from '../../models/cliente';
import { GLOBAL } from '../../services/global';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  providers: [ClienteService],
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {
  public title:string;
  public status:string;
  public listCliente;
  public cliente:Cliente;
  public page:Number;


  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _clienteService: ClienteService
  ) {
    this.title = "Clientes";
    this.cliente = new Cliente('', '', '', '', '', '', '', 0, '', 0, '', 0, '', '');
   }

  ngOnInit() {
    //Loguear el usuario y conseguir sus datos
    this._clienteService.getclientes(null).subscribe(
      response => {

        this.page = response.pages;
        this.listCliente = response.clientes;
        console.log(this.page);
        console.log(this.listCliente);

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
