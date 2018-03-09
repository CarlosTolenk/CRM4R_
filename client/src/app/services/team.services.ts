import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';
import { Team } from '../models/team';

@Injectable()
export class TeamService{
  public url:string;
  public identity;
  public token;
  public stats;

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

    getIdentity(){
      let identity = JSON.parse(localStorage.getItem('identity'));

      if(identity != "undefined"){
        this.identity = identity;
      }else{
        this.identity = null;
      }

      return this.identity;
    }

    getToken(){
      let token = localStorage.getItem('token');

      if(token !=  "undefined"){
        this.token = token;
      }else{
        this.token = null;
      }

      return this.token;
    }

    getStats(){
      let stats = JSON.parse(localStorage.getItem('stats'));

      if(stats != "undefined"){
        this.stats = stats;
      }else{
        this.stats = null;
      }

      return this.stats;
    }

    getCounters(): Observable<any>   {
      let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                     .set('Authorization', this.getToken());

      return this._http.get(this.url + 'get-count', {headers: headers});
    }

    updateTeam(team: Team): Observable<any>{
      let params = JSON.stringify(team);

      let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                     .set('Authorization', this.getToken());
                                     //update-team/:id
                                    

      return this._http.put(this.url + 'update-team/' + team._id, params, {headers: headers});
    }
}
