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

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _ticketService: TicketService
  ) {
    this.tickets = new Ticket('','','',{},0,'','');
    this.informacionTicket = new Array ();

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
    this._ticketService.getTickets().subscribe(
          response => {
            if(!response.tickets){
              this.status = 'error';
            }else{
              this.listTickets = response.tickets;
              // for(let i=0; i<this.listTickets.length; i++){
              //   let info = {
              //     "tipo": this.listTickets[i].tipo,
              //     "cliente": this.listTickets[i].prestamo.cliente,
              //   }
              // }
              // this.informacionTicket = this.tickets;
              console.log(this.listTickets);
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


    }
  }

}
