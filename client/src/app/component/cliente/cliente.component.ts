import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgxPaginationModule} from 'ngx-pagination';
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
  public listCliente: Cliente[];
  public cliente:Cliente;
  public page;
  public pages;
  public total;
  public next_page;
  public prev_page;


  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _clienteService: ClienteService
  ) {
    this.title = "Clientes";
    this.cliente = new Cliente('', '', '', '', '', '', '', 0, '', 0, '', 0, '', '');
   }

  ngOnInit() {
      this.getClientes();
  }

  getClientes(){

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

  buscarCliente(termino:string){

    let clientesArr:Cliente[] = [];
    termino = termino.toLowerCase();

    for(let cliente of this.listCliente){
      let nombre = cliente.nombre.toLowerCase();

      if(nombre.indexOf(termino) >= 0 ){
        clientesArr.push(cliente);
      }
    }
    console.log(clientesArr);
      this._clienteService.buscadorCliente(clientesArr);
      this._router.navigate(['/home/clientes/buscar']);
  }





}
