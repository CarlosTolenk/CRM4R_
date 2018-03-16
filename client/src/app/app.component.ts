import { Component } from '@angular/core';
import { TeamService } from './services/team.services'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [TeamService],
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public title:string;
  public identity;

  constructor(
    private _teamService: TeamService

  ){
    this.title = 'CRM 4R';
  }

  ngOnInit(){
    this.identity = this._teamService.getIdentity();
    // console.log(this.identity);
  }


}
