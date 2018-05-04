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
  public busqueda:Boolean;
  public terminoB:string;
  public busquedaPrestamo:Prestamo[];

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _prestamosService: PrestamosService
  ) {
    this.prestamo = new Prestamo({cedula:''},'', '', 0 ,'','','',0,0,0,'',0 ,'','','');
    this.terminoB = "";
    this.busqueda = false;
   }


  ngOnInit() {

    //Conseguir todos los datos del cliente
    this._prestamosService.getPrestamos().subscribe(
          response => {
            if(!response.prestamos){
              this.status = 'error';
            }else{
              this.listPrestamo = response.prestamos;
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

    buscarCliente(termino:string){

      this.busqueda = true;
      this.terminoB = termino;
      let prestamoSelecionado:Prestamo[] = [];
      termino = termino.toLowerCase();

      for(let prestamo of this.listPrestamo){
        let cedula = prestamo.cliente.cedula;
        let referencia = prestamo.referencia;


        if(cedula.indexOf(termino) >= 0  ){
          prestamoSelecionado.push(prestamo);
        }

        if(referencia.indexOf(termino) >= 0  ){
          prestamoSelecionado.push(prestamo);
        }

      }

      this.busquedaPrestamo = prestamoSelecionado;   

    }

    volver(){
      this.terminoB = "";
      this.busqueda = false;
    }

}
