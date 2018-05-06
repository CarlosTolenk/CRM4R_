import { Component, OnInit, DoCheck } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { TicketService } from '../../../services/ticket.services';
import { Ticket } from '../../../models/tickets';
import { GLOBAL } from '../../../services/global';

@Component({
  selector: 'app-ver-ticket',
  templateUrl: './ver-ticket.component.html',
  providers: [TicketService],
  styleUrls: ['./ver-ticket.component..scss']
})
export class VerTicketComponent implements OnInit {
  public status:string;
  public tickets:Ticket;
  public comentarios:String[];

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _ticketService: TicketService
  ) {
    this.tickets = new Ticket('','','',{},0,'','');

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
    console.log("Detalle del ticket");
    this._route.params.subscribe(res => {
      //Obtener la información del ticket
      this._ticketService.getTicket(res.id).subscribe(
            response => {
              if(!response.ticket){
                this.status = 'error';
              }else{
                this.tickets = response.ticket;
                console.log(this.tickets);

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

        //Obtener los comentarios
        this._ticketService.getComentarios(res.id).subscribe(
             response => {
               if(!response.ticket){
                 this.status = 'error';
               }else{
                 this.comentarios = response.comentario;
                 console.log(this.comentarios);

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
    console.log(this.status);
  }

  //Este método lo que hace es cada vez que hace un cambio, esto refrescas el componenten
  // ngDoCheck(){
  // this._route.params.subscribe(res => {
  //   this._ticketService.getComentarios(res.id).subscribe(
  //         response => {
  //           if(!response.ticket){
  //             this.status = 'error';
  //           }else{
  //             this.comentarios = response.comentario;
  //             console.log(this.comentarios);
  //
  //           }
  //
  //         },
  //         error => {
  //               var errorMessage = <any>error;
  //               console.log(errorMessage);
  //               if(errorMessage != null){
  //                 this.status = 'error';
  //             }
  //         }
  //     );
  //  });
  // }

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
          return '#FFFFF';

    }
  }

  volverListar() : void{
    window.history.back();
  }

}
