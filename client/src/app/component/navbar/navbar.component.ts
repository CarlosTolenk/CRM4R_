import { Component, OnInit, DoCheck } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { TeamService } from '../../services/team.services';
import { GLOBAL } from '../../services/global';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  providers: [TeamService],
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, DoCheck{
  public identity;
  public url:string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _teamService: TeamService
  ) {
      this.url = GLOBAL.url;
   }

  ngOnInit() {
    this.identity = this._teamService.getIdentity();
    //console.log(this.identity);
  }

  logout(){
    localStorage.clear();
    this.identity = null;
    this._router.navigate(['/login']);
  }

  //Este método lo que hace es cada vez que hace un cambio, esto refrescas el componenten
  ngDoCheck(){
    this.identity = this._teamService.getIdentity();
  }


}
