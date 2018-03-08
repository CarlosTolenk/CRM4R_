import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { TeamService } from '../../services/team.services';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  providers: [TeamService],
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public identity;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _teamService: TeamService
  ) { }

  ngOnInit() {
    this.identity = this._teamService.getIdentity();
    //console.log(this.identity);
  }

  logout(){
    localStorage.clear();
    this.identity = null;
    this._router.navigate(['/login']);
  }

  /*
  ngDoCheck(){
  Este método lo que hace es cada vez que hace un cambio, esto refrescas el componenten
  1. import { Component, OnInit,DoCheck  } from '@angular/core';
  2. export class NavbarComponent implements OnInit, DoCheck
}
*/

}
