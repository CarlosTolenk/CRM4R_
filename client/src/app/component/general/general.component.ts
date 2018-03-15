import { Component, OnInit } from '@angular/core';
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
export class GeneralComponent implements OnInit {

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

    this.stats = this._teamService.getStats();
    console.log(this.stats.Clientes.clientes_activos);
    console.log(this.stats);
  }

}
