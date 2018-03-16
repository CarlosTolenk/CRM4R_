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


  getclientes(page): Observable<any>{

    if(page == null) page = 1;

    let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                   .set('Authorization', this.token);

    return this._http.get(this.url + 'get-clientes/'+ page, {headers: headers});
  }



}
