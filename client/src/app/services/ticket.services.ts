import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { TeamService } from '../services/team.services';
import { GLOBAL } from './global';
import { Ticket } from '../models/tickets';
// import { Cliente } from '../models/cliente';


@Injectable()

export class TicketService{
  public url:string;
  public token;

  constructor(
    public _http: HttpClient,
    private _teamService: TeamService
  ){
    this.url = GLOBAL.url;
    this.token = _teamService.getToken();
  }

// Agregar un nuevo prestamos
  // addPrestamo(prestamo: Prestamo): Observable<any>{
  //   let params = JSON.stringify(prestamo);
  //
  //   let headers = new HttpHeaders().set('Content-Type', 'application/json')
  //                                  .set('Authorization', this.token);
  //
  //   return this._http.post(this.url + 'add-prestamo', params, {headers: headers});
  // }

// Obtener todos los datos de todos los clientes
  getTickets(): Observable<any>{

    let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                   .set('Authorization', this.token);

    return this._http.get(this.url + 'get-tickets', {headers: headers});
  }



  // Obtener todos los datos de un préstamo únicamente
  // getPrestamo(id): Observable<any>{
  //   let headers = new HttpHeaders().set('Content-Type', 'application/json')
  //                                  .set('Authorization', this.token);
  //
  //   return this._http.get(this.url + 'get-prestamo/'+ id, {headers: headers});
  // }

  //Actualizar los prestamos
  // updatePrestamo(prestamo: Prestamo): Observable<any>{
  //   let params = JSON.stringify(prestamo);
  //
  //   let headers = new HttpHeaders().set('Content-Type', 'application/json')
  //                                  .set('Authorization', this.token);
  //
  //
  //
  //   return this._http.put(this.url + 'update-prestamo/' + prestamo._id, params, {headers: headers});
  // }

  //Eliminar los prestamos
  // deleteCliente(id): Observable<any>{
  //   let headers = new HttpHeaders().set('Content-Type', 'application/json')
  //                                  .set('Authorization', this.token);
  //
  //   return this._http.delete(this.url + 'delete-cliente/'+ id, {headers: headers});
  // }





}