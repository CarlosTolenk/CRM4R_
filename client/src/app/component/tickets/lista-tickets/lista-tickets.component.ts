import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgxPaginationModule} from 'ngx-pagination';
import { TicketService } from '../../../services/ticket.services';
import { Ticket } from '../../../models/tickets';
import { GLOBAL } from '../../../services/global';

@Component({
  selector: 'app-lista-tickets',
  templateUrl: './lista-tickets.component.html',
  providers: [TicketService],
  styleUrls: ['./lista-tickets.component..scss']
})
export class ListaTicketsComponent implements OnInit {
  public status:string;
  public tickets:Ticket;
  public listTickets:Ticket[];
  public informacionTicket;
  public ticketEnProceso:Ticket[];
  public ticketAprobados:Ticket[];
  public ticketDenegados:Ticket[];
  public ticketCompletados:Ticket[];
  public enProceso:Boolean;
  public aprobados:Boolean;
  public denegados:Boolean;
  public completados:Boolean;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _ticketService: TicketService
  ) {
    this.tickets = new Ticket('','','',{},0,'','');
    this.informacionTicket = new Array ();
    this.enProceso = true;
    this.aprobados = false;
    this.denegados = false;
    this.completados = false;

    // public _id: String,
    // public tipo: String,
    // public cliente: Object,
    // public prestamo: Object,
    // public votos: Number,
    // public estado: String,
    // public fecha: String
  }

  ngOnInit() {
    //Conseguir todos los datos del prestamo
    this.enProceso = true;
    this._ticketService.getTickets().subscribe(
          response => {
            if(!response.tickets){
              this.status = 'error';
            }else{
              this.listTickets = response.tickets;


              let enProceso:Ticket[] = [];

              for(let filtro of this.listTickets){

                if(filtro.estado == "EN PROCESO" ){
                  enProceso.push(filtro);
                }
              }

              this.ticketEnProceso = enProceso;
              console.log(this.ticketEnProceso);
              // for(let i=0; i<this.listTickets.length; i++){
              //   let info = {
              //     "tipo": this.listTickets[i].tipo,
              //     "cliente": this.listTickets[i].prestamo.cliente,
              //   }
              // }
              // this.informacionTicket = this.tickets;
              // console.log(this.listTickets);
              // console.log(this.listTickets[2].estado);
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

  getColor(estado){
    switch(estado){
      case 'PRE-APROBADO':
          return '#7CB342';
      case 'APROBADO':
          return '#2E7D32';
      case 'PRE-DENEGADO':
          return '#FF9800';
      case 'DENEGADO':
          return '#C62828';
      default:
          return '#1976D2';

    }
  }

  detalleTicket(id){
    console.log("Detalle");
    this._router.navigate(['home/tickets/detalle', id]);
  }

  getTicketEnProceso(){
    this.enProceso = true;
    this.aprobados = false;
    this.denegados = false;
    this.completados = false;

    let enProceso:Ticket[] = [];

    for(let filtro of this.listTickets){

      if(filtro.estado == "EN PROCESO" ){
        enProceso.push(filtro);
      }
    }

    this.ticketEnProceso = enProceso;

  }

  getTicketAprobado(){
    this.enProceso = false;
    this.aprobados = true;
    this.denegados = false;
    this.completados = false;

    let aprobados:Ticket[] = [];

    for(let filtro of this.listTickets){

      if(filtro.estado == "APROBADO" ){
        aprobados.push(filtro);
      }
    }

    this.ticketAprobados = aprobados;

  }

  getTicketDenegado(){
    this.enProceso = false;
    this.aprobados = false;
    this.denegados = true;
    this.completados = false;

    let denegado:Ticket[] = [];

    for(let filtro of this.listTickets){

      if(filtro.estado == "DENEGADO"){
        denegado.push(filtro);
      }
    }

    this.ticketDenegados = denegado;

  }

  getTicketCompletados(){
    this.enProceso = false;
    this.aprobados = false;
    this.denegados = false;
    this.completados = true;

    let completados:Ticket[] = [];

    for(let filtro of this.listTickets){

      if(filtro.estado == "COMPLETADO"){
        completados.push(filtro);
      }
    }

    this.ticketCompletados = completados;

  }

}
