import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';
import { Team } from '../models/team';

@Injectable()
export class TeamService{
  public url:string;

  constructor(
    public _http: HttpClient){
      this.url = GLOBAL.url;
    }

    registro(team: Team): Observable<any>{
      let params = JSON.stringify(team);
      let headers = new HttpHeaders().set('Content-Type', 'application/json');

      return this._http.post(this.url + 'register', params, {headers: headers});
    }

    signup(team: Team, gettoken = null):Observable<any>{
      if(gettoken != null){
        team.gettoken = gettoken;
      }

      let params = JSON.stringify(team);
      let headers = new HttpHeaders().set('Content-Type', 'application/json');

      return this._http.post(this.url + 'login', params, {headers: headers});
    }
}
