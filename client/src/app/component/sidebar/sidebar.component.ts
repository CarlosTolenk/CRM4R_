import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { TeamService } from '../../services/team.services';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  providers: [TeamService],
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  public identity;
  public admin;


  constructor(
  private _route: ActivatedRoute,
  private _router: Router,
  private _teamService: TeamService

  ) { }

  ngOnInit() {
    this.identity = this._teamService.getIdentity();
    if(this.identity.role == "ROLE_ADMIN"){
      this.admin = this.identity.role
    }else{
      this.admin = null;
    }
  }


/*  $("#menu-toggle").click(function(e) {
        e.preventDefault();
        $("#wrapper").toggleClass("active");
      }
  );*/

}
