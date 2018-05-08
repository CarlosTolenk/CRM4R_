import { Component, OnInit, DoCheck } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { TicketService } from '../../../services/ticket.services';
import { ToastService } from '../../../services/toast-service.service';
import { TeamService } from '../../../services/team.services';
import { Ticket } from '../../../models/tickets';
import { Comentario } from '../../../models/comentario';
import { CommentShow } from '../../../models/commetShow';
import { GLOBAL } from '../../../services/global';

@Component({
  selector: 'app-ver-ticket',
  templateUrl: './ver-ticket.component.html',
  providers: [TicketService, TeamService, ToastService],
  styleUrls: ['./ver-ticket.component..scss']
})
export class VerTicketComponent implements OnInit {
  public status:string;
  public url:string;
  public tickets:Ticket;
  public comentarios:String[];
  public identity;
  public accionVoto:boolean;
  public comentario:string;
  public arrComentario:Comentario[];
  public pushComentario:boolean;
  public showComentario:CommentShow[];



  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _ticketService: TicketService,
    private _teamService: TeamService,
    private _toastService: ToastService
  ) {
    this.tickets = new Ticket('','','',{},0,'','');
    this.url = GLOBAL.url;
    this.identity = _teamService.getIdentity();
    this.pushComentario = false;
    }

  ngOnInit() {
    //Conseguir todos los datos del prestamo
    // console.log("Detalle del ticket");
    this._route.params.subscribe(res => {
      //Obtener la información del ticket
      this._ticketService.getTicket(res.id).subscribe(
            response => {
              if(!response.ticket){
                this.status = 'error';
              }else{
                this.tickets = response.ticket;
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
               if(!response.comentario){
                 this.status = 'error';
               }else{
                 this.arrComentario = response.comentario;

                this.arrComentario.forEach(function(comentario){
                  this.showComentario.nombre_usuario = comentario.team.nombre_usuario;
                  console.log(this.showComentario);
                });
               }
               // console.log(this.showComentario);
               // public nombre_usuario:String,
               // public avatar:String,
               // public texto:String

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

  //Este método lo que hace es cada vez que hace un cambio, esto refrescas el componenten
  ngDoCheck(){


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
          return '#FFFFF';

    }
  }

  rizeVoto(){
    let id = this.tickets._id;
    this.tickets.votos++;
    // console.log("ID: " + id + "Los votos: " + votos);
    this._ticketService.updateTicket(this.tickets).subscribe(
          response => {
            if(!response.ticket){
              this.status = 'error';
            }else{
              this._toastService.Success("Tu voto ha sido procesado exitosamente", "Acción Completada");
              let objComentario:Comentario = {
                team: this.identity._id,
                ticket: this.tickets._id,
                texto: this.identity.nombre_usuario + " " + "ha aprobado",
                accion_voto: true
              };

              console.log(objComentario);
              this._ticketService.addComentarios(objComentario).subscribe(
                   response => {
                     if(!response.comentario){
                       this.status = 'error';
                     }else{
                       this.arrComentario = response.comentario;
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
          },
          error => {
                var errorMessage = <any>error;
                console.log(errorMessage);
                if(errorMessage != null){
                  this.status = 'error';
                  this._toastService.Error("Tu voto no ha podido ser procesado", "Error");
              }
          }
      );
  }

  addComment(comentario){
    let objComentario:Comentario = {
      team: this.identity._id,
      ticket: this.tickets._id,
      texto: this.comentario,
      accion_voto: false
    };

    // this.arrComentario.push(objComentario);

    this.comentario = "";
    this._ticketService.addComentarios(objComentario).subscribe(
         response => {
           if(!response.comentario){
             this.status = 'error';
           }else{
             this.arrComentario = response.comentario;
             this._toastService.Success("Tu comentario ha sido procesado exitosamente", "Acción Completada");
             console.log(this.identity);
             this.pushComentario = true;
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

  detallePrestamos(id){
    this._router.navigate(['home/prestamos/ver', id]);
  }

  volverListar() : void{
    window.history.back();
  }

}
