import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ClienteService } from '../../../services/cliente.services';
import { Cliente } from '../../../models/cliente';
import { GLOBAL } from '../../../services/global';

@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html',
  providers: [ClienteService],
  styleUrls: ['./editar-cliente.component.css']
})
export class EditarClienteComponent implements OnInit {

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _clienteService: ClienteService
  ) { }

  ngOnInit() {
  }

  volverListar(){
    this._router.navigate(['home/clientes']);
  }

}
