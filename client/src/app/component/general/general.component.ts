import { Component, OnInit, DoCheck } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { TeamService } from '../../services/team.services';
import { DeprecatedCurrencyPipe } from '@angular/common';
import { GLOBAL } from '../../services/global';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  providers: [TeamService],
  styleUrls: ['./general.component.css']
})
export class GeneralComponent implements OnInit, DoCheck  {

  public title:string;
  public stats;
  public url:string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _teamService: TeamService
  ) {
    this.url = GLOBAL.url;
    this.title = "Estadísticas Generales";
   }

  ngOnInit() {
    this.getCounters();
    this.stats = this._teamService.getStats();
    // console.log(this.stats.Clientes.clientes_activos);
    // console.log(this.stats);
  }

  ngDoCheck(){
    this.stats = this._teamService.getStats();
  }

  getCounters(){
      this._teamService.getCounters().subscribe(

          response => {
            // console.log(response);
            localStorage.setItem('stats', JSON.stringify(response));
          },
          error => {
            console.log(<any>error);
          }
      )
  }

}
