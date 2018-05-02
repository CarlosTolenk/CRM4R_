import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DeprecatedCurrencyPipe } from '@angular/common';
import { NgxPaginationModule} from 'ngx-pagination';
import { ClienteService } from '../../../services/cliente.services';
import { Cliente } from '../../../models/cliente';
import { GLOBAL } from '../../../services/global';

@Component({
  selector: 'app-lista-cliente',
  templateUrl: './lista-cliente.component.html',
  providers: [ClienteService],
  styleUrls: ['./lista-cliente.component.css']
})
export class ListaClienteComponent implements OnInit {
  public title:string;
  public status:string;
  public listCliente: Cliente[];
  public cliente:Cliente;
  public busquedaCliente:Cliente[];
  public busquedaActivos:Cliente[];
  public busquedaCandidatos:Cliente[];
  public activo:Boolean;
  public candidato:Boolean;
  public busqueda:Boolean;
  public terminoB:string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _clienteService: ClienteService

  ) {
    this.title = "Clientes";
    this.terminoB = "";
    this.busqueda = false;
    this.activo = false;
    this.candidato = false;
    this.cliente = new Cliente('', '', '', '', '', '', '', 0, '', '', '', 0, '', 0, '', '');
   }

   ngOnInit() {
       this.getClientes();
       // console.log(this.terminoB);

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

   getClientesTodos(){
     this.activo = false;
     this.candidato = false;
   }


   getClientesActivos(){
     this.candidato = false;
     this.activo = true;


     let clientesArr:Cliente[] = [];

     for(let cliente of this.listCliente){

       if(cliente.activo == "true" ){
         clientesArr.push(cliente);
       }
     }

     this.busquedaActivos = clientesArr;
   }

   getClientesCandidatos(){
     this.activo = false;
     this.candidato = true;

     let clientesArr:Cliente[] = [];

     for(let cliente of this.listCliente){

       if(cliente.activo != "true" ){
         clientesArr.push(cliente);
       }
     }

     this.busquedaCandidatos = clientesArr;

   }

   buscarCliente(termino:string){

     this.busqueda = true;
     this.terminoB = termino;
     let clientesArr:Cliente[] = [];
     termino = termino.toLowerCase();

     for(let cliente of this.listCliente){
       let nombre = cliente.nombre.toLowerCase();

       if(nombre.indexOf(termino) >= 0 ){
         clientesArr.push(cliente);
       }
     }

     this.busquedaCliente = clientesArr;
   }

   volver(){
     this.terminoB = "";
     this.busqueda = false;

   }


}
