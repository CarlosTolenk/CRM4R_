import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClienteService } from '../../../services/cliente.services';
import { Cliente } from '../../../models/cliente';
import { GLOBAL } from '../../../services/global';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  providers: [ClienteService],
  styleUrls: ['./buscador.component.css']
})
export class BuscadorComponent implements OnInit {
  public cliente:Cliente[];

  constructor(
    private _route: ActivatedRoute,
    private _clienteService: ClienteService

  ) { }

  ngOnInit() {
    this.cliente = this._clienteService.getBuscadorCliente();
    console.log("Desde el componente buscador");
    console.log(this.cliente);
  }

}
