import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { GLOBAL } from '../../services/global';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',

  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public stats;
  public url:string;
  public toggle:string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    this.url = GLOBAL.url;
    this.toggle = 'toggle-disactive'
   }

  ngOnInit() {}

  toggleSidebar(event){

    event.preventDefault();
    if(this.toggle != 'toggle-active'){
      this.toggle = 'toggle-active';
    }else{
      this.toggle = "toggle-disactive";
    }
  }


}
