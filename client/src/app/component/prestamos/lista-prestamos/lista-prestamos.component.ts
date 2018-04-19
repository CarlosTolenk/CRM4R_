import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgxPaginationModule} from 'ngx-pagination';
import { PrestamosService } from '../../../services/prestamos.services';
import { Prestamo } from '../../../models/prestamo';
import { GLOBAL } from '../../../services/global';

@Component({
  selector: 'app-lista-prestamos',
  templateUrl: './lista-prestamos.component.html',
  providers: [PrestamosService],
  styleUrls: ['./lista-prestamos.component..scss']
})
export class ListaPrestamosComponent implements OnInit {
  public status:string;
  public prestamo:Prestamo;
  public listPrestamo: Prestamo[];

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _prestamosService: PrestamosService
  ) {
    this.prestamo = new Prestamo("","",0,"","",0,0,"",0,"",0,"","");
   }


  ngOnInit() {

    //Conseguir todos los datos del cliente
    this._prestamosService.getPrestamos().subscribe(
          response => {
            if(!response.prestamos){
              this.status = 'error';
            }else{
              this.listPrestamo = response.prestamos;
              console.log(response.prestamos);
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
  }

}
