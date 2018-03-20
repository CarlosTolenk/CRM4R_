import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { TeamService } from '../services/team.services';
import { GLOBAL } from './global';
import { Cliente } from '../models/cliente';

@Injectable()

export class ClienteService{
  public url:string;
  public token;



  constructor(
    public _http: HttpClient,
    private _teamService: TeamService
  ){
    this.url = GLOBAL.url;
    this.token = _teamService.getToken();
  }


  getClientes(): Observable<any>{

    let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                   .set('Authorization', this.token);

    return this._http.get(this.url + 'get-clientes', {headers: headers});
  }

  //get-clientes/:page

  // Obtener todos los datos de un cliente únicamente

  // Aun no he desarrollado ese método en el API así que ojo
  // getcliente(id): Observable<any>{
  //
  //   let headers = new HttpHeaders().set('Content-Type', 'application/json')
  //                                  .set('Authorization', this.token);
  //
  //   return this._http.get(this.url + 'get-cliente/'+ id, {headers: headers});
  // }





}
