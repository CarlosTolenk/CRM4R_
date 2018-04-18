import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { TeamService } from '../services/team.services';
import { ClienteService } from '../services/cliente.services';
import { GLOBAL } from './global';
import { Prestamo } from '../models/prestamo';
import { Cliente } from '../models/cliente';


@Injectable()

export class PrestamosService{
  public url:string;
  public token;

  constructor(
    public _http: HttpClient,
    private _teamService: TeamService,
    private _clienteService: ClienteService
  ){
    this.url = GLOBAL.url;
    this.token = _teamService.getToken();
  }

// Agregar un nuevo prestamos
  addCliente(cliente: Cliente): Observable<any>{
    let params = JSON.stringify(cliente);

    let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                   .set('Authorization', this.token);

    return this._http.post(this.url + 'add-cliente', params, {headers: headers});
  }

// Obtener todos los datos de todos los clientes
  getClientes(): Observable<any>{

    let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                   .set('Authorization', this.token);

    return this._http.get(this.url + 'get-clientes', {headers: headers});
  }



  // Obtener todos los datos de un cliente únicamente
  getCliente(id): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                   .set('Authorization', this.token);

    return this._http.get(this.url + 'get-cliente/'+ id, {headers: headers});
  }

  //Actualizar los prestamos
  updateCliente(cliente: Cliente): Observable<any>{
    let params = JSON.stringify(cliente);

    let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                   .set('Authorization', this.token);



    return this._http.put(this.url + 'update-cliente/' + cliente._id, params, {headers: headers});
  }

  //Eliminar los prestamos
  deleteCliente(id): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                   .set('Authorization', this.token);

    return this._http.delete(this.url + 'delete-cliente/'+ id, {headers: headers});
  }





}
