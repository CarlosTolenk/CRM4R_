import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ClienteService } from '../../../services/cliente.services';
import { Cliente } from '../../../models/cliente';
import { GLOBAL } from '../../../services/global';

@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html',
  providers: [ClienteService],
  styleUrls: ['./editar-cliente.component.css']
})
export class EditarClienteComponent implements OnInit {

  public cliente:Cliente;
  public status:string;
  public url:string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _clienteService: ClienteService
  ) {
    //Darle estado inicial a las variables
    this.cliente = new Cliente('', '', '', '', '', '', '', 0, '', 0, '', 0, '', '');
    this.url = GLOBAL.url;

  }

  ngOnInit() {
    this._route.params.subscribe(res => {
      this._clienteService.getCliente(res.id).subscribe(
        response => {
          if(!response.cliente){
            this.status = 'error';
          }else{
            this.cliente = response.cliente;
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
  }

  volverListar(){
    this._router.navigate(['home/clientes']);
  }

}
