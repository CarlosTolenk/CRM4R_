import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Team } from '../../models/team';
import { TeamService } from '../../services/team.services';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  providers: [TeamService],
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  public title:string;
  public team:Team;
  public status:string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _teamService: TeamService
   ) {
      this.title = 'REGISTRAR';
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

  onSubmit(form){
    this._teamService.registro(this.team).subscribe(
        response => {
          if(response.team && response.team._id){
          //  console.log(response.team);
            this.status = 'success';
            form.reset();
          }else{
            this.status = 'error';
          }
        },
        error => {
          console.log(<any>error);
        }
    );
  }

}
