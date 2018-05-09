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
  public likeDo:boolean;
  public showComentario: CommentShow[];
  public changeDectec:boolean;
  public concluir:boolean;
  public denegar:boolean;
  public inicial:boolean;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _ticketService: TicketService,
    private _teamService: TeamService,
    private _toastService: ToastService
  ) {
    this.tickets = new Ticket('','','',{},0,'','','');
    this.url = GLOBAL.url;
    this.identity = _teamService.getIdentity();
    this.changeDectec = false;
    this.likeDo = false;
    this.concluir = false;
    this.inicial = true;
    this.denegar = false;

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
                console.log(this.tickets);
                if(this.tickets.estado == 'APROBADO' || this.tickets.tipo == 'Legal'){
                  this.concluir = true;
                }
                if((this.tickets.estado == 'EN PROCESO' ||  this.tickets.estado == "PRE-APROBADO" || this.tickets.estado == "PRE-DENEGADO") && this.tickets.tipo == 'Prestamo'){
                  this.denegar = true;
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

        //Obtener los comentarios
        this._ticketService.getComentarios(res.id).subscribe(
             response => {
               if(!response.comentario){
                 this.status = 'error';
               }else{
                 this.arrComentario = response.comentario;
                 // console.log(this.identity.nombre_usuario);
                 console.log(this.arrComentario)
                 //Revisar si en algun comentario ya hay un like
                 this.arrComentario.forEach((element) =>{
                 //En el backend así lo estoy manejando
                  if(element.accion_voto && element.usuario == this.identity.nombre_usuario){
                    this.likeDo = true;
                    // console.log("Ya votaste");
                  }
                });
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

  //Este método lo que hace es cada vez que hace un cambio, esto refrescas el componenten
  ngDoCheck(){
  //Refrescar los comentarios
  if(this.changeDectec){
    this._ticketService.getComentarios(this.tickets._id).subscribe(
         response => {
           if(!response.comentario){
             this.status = 'error';
           }else{
             this.arrComentario = response.comentario;
             // console.log(this.arrComentario);
             //Revisar si han hecho like
             this.arrComentario.forEach((element) =>{
             if(element.accion_voto && element.usuario == this.identity.nombre_usuario){
               this.likeDo = true;
               // console.log("Ya votaste");
             }
            });
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
     this.changeDectec = false;
   }
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

    if(!this.likeDo){
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
                  accion_voto: 'true'
                };

                console.log(objComentario);
                this._ticketService.addComentarios(objComentario).subscribe(
                     response => {
                       if(!response.comentario){
                         this.status = 'error';
                       }else{
                         //Actualizar los comentarios
                         this.changeDectec = true;
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

    }else{
      this._toastService.Error("Ya haz dado tu aprobacion", "Solo es un voto");
    }
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
               //Actualizar los comentarios
               this.changeDectec = true;
               this._toastService.Success("Tu comentario ha sido procesado exitosamente", "Acción Completada");
               console.log(this.identity);

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

  concluirTicket(){
    this.tickets.estado = "COMPLETADO";

    this._ticketService.updateTicket(this.tickets).subscribe(
          response => {
            if(!response.ticket){
              this.status = 'error';
            }else{
              console.log(response.ticket);
              this._toastService.Success("Ya se ha completado exitosamente", "Ticket Completado");
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

  eliminarTicket(){
    this.tickets.estado = "DENEGADO";

    this._ticketService.updateTicket(this.tickets).subscribe(
          response => {
            if(!response.ticket){
              this.status = 'error';
            }else{
              console.log(response.ticket);
              this._toastService.Success("Ya se ha completado exitosamente", "Ticket Completado");
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
  }

}
