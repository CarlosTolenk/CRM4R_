import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DeprecatedCurrencyPipe } from '@angular/common';
import { ClienteService } from '../../../services/cliente.services';
import { PrestamosService } from '../../../services/prestamos.services';
import { ToastService } from '../../../services/toast-service.service';
import { Cliente } from '../../../models/cliente';
import { Prestamo } from '../../../models/prestamo';
import { GLOBAL } from '../../../services/global';

@Component({
  selector: 'app-ver-prestamos',
  templateUrl: './ver-prestamos.component.html',
  providers: [ClienteService, ToastService,PrestamosService ],
  styleUrls: ['./ver-prestamos.component..scss']
})
export class VerPrestamosComponent implements OnInit {
  public cliente:Cliente;
  public prestamo:Prestamo;
  public status:string;
  public url:string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _clienteService: ClienteService,
    private _prestamoService: PrestamosService,
    private _toastService: ToastService
  ) {
    this.cliente = new Cliente('', '', '', '', '', '', '', 0, '', '', '', 0, '', 0, '', '');
    this.prestamo = new Prestamo("","",0,"","Diario", "",0,0,"",0,"",0,"","");
    this.url = GLOBAL.url;
   }

  ngOnInit() {
    this._route.params.subscribe(res => {
      this._prestamoService.getPrestamo(res.id).subscribe(
        response => {
          if(!response.prestamo){
            this.status = 'error';
          }else{
            this.prestamo = response.prestamo;
            console.log(this.prestamo);
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



  volverListar(){
    this._router.navigate(['home/prestamos']);
  }

}
