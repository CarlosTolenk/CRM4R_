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
    this.actualPage();
  }


  actualPage(){
      this._route.params.subscribe(params =>{
        let page = +params['page']; //Convertido a entero
        this.page = page;

        if(!params['page']){
          page = 1;
        }

        if(!page){
          page = 1;
        }else{
          this.next_page = page+1;
          this.prev_page = page-1;

          if(this.prev_page <= 0){
            this.prev_page = 1;
          }
        }
        //Devolver listado de clientes
        this.getClientes(page);
      });
  }

  getClientes(page){

    //Conseguir todos los datos del cliente
    this._clienteService.getClientes(page).subscribe(
          response => {
            if(!response.clientes){
              this.status = 'error';
            }else{
              this.pages = response.pages;
              this.listCliente = response.clientes;
              this.total = response.total;

              if(page > this.pages){              
                this._router.navigate(['home/clientes', 1]);
              }
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
  PrevPage(){
    this._router.navigate(['home/clientes', this.prev_page]);
  }

  NextPage(){
    this._router.navigate(['home/clientes', this.next_page]);
  }

}
