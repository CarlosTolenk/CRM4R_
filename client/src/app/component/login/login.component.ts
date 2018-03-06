import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Team } from '../../models/team';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public title:string;
  public team:Team;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router

  ){
     this.title = 'INGRESAR';
     this.team = new Team(
                           "",
                           "",
                           "",
                           "",
                           "",
                           "",
                           "",
                           ""
     );

  }

  ngOnInit() {
  }

}
