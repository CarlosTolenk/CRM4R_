import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ClienteService } from '../../services/cliente.services';
import { GLOBAL } from '../../services/global';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  providers: [ClienteService],
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {
  public title:string;
  public status:string;


  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _clienteService: ClienteService
  ) {
    this.title = "Clientes";
   }

  ngOnInit() {
    //Loguear el usuario y conseguir sus datos
    this._clienteService.getclientes(null).subscribe(
      response => {
        console.log(response);

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
