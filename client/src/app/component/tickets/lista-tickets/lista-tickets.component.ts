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
  public ticket:Ticket;
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _ticketService: TicketService
  ) {
    this.ticket = new Ticket('','',{},{},0,'','');

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
    console.log("Funciona");
    this._ticketService.getTickets().subscribe(
          response => {
            if(!response.tickets){
              this.status = 'error';
            }else{
              this.ticket = response.tickets;
              console.log(this.ticket);
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

}
