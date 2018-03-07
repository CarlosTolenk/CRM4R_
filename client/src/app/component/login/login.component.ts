import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Team } from '../../models/team';
import { TeamService } from '../../services/team.services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  providers: [TeamService],
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public title:string;
  public team:Team;
  public status:string;
  public identity;
  public token;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _teamService: TeamService

  ){
     this.title = 'INGRESAR';
     this.team = new Team("","","","","","","","");
  }

  ngOnInit() {
  }

  onSubmit(){
      //Loguear el usuario y conseguir sus datos
      this._teamService.signup(this.team).subscribe(
        response => {
            this.identity = response.team;
            console.log(this.identity);
            if(!this.identity || !this.identity._id){
              this.status = 'error'
            }else{
              this.status = 'success';
              //Persistir datos del usuario

              //Conseguir token
              this.getToken();
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

  getToken(){
    this._teamService.signup(this.team, 'true').subscribe(
      response => {
          this.token = response.token;
          console.log(this.token);

          if(!this.token.length <= 0){
            this.status = 'error'
          }else{
            this.status = 'success';
            //Persistir el token

            //Conseguir los marcadores o estadisticas del usuario
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


}
