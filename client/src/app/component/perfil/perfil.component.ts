import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Team } from '../../models/team';
import { TeamService } from '../../services/team.services';
import { UploadServices } from '../../services/upload.services';
import { GLOBAL } from '../../services/global';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  providers: [TeamService, UploadServices],
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  public title:string;
  public team: Team;
  public identity;
  public token;
  public status;
  public repeatPassword:string;
  public url:string;
  public imagenTemp:string;
  public closeModal:boolean;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _teamServices: TeamService,
    private _uploadService: UploadServices,

  ) {

    this.title = 'Actualizar mis datos';
    this.team = this._teamServices.getIdentity();
    this.identity = this.team;
    this.token = this._teamServices.getToken();
    this.repeatPassword = '';
    this.url = GLOBAL.url;
    this.closeModal = false;
  }

  ngOnInit() {
    console.log(this.team);
    console.log('PerfilComponent se ha cargado');
  }

  onSubmit(){
    console.log(this.team);
    this._teamServices.updateTeam(this.team).subscribe(
            response => {
              if(!response.team){
                this.status = 'error';
              }else{
                this.status = 'success';
                localStorage.setItem('identity', JSON.stringify(this.team));
                this.identity = this.team;

                //Subida de imagen de Usuario api/upload-image-team/:id'
                this._uploadService.makeFileRequest(this.url + 'upload-image-team/' + this.team._id, [], this.fileToUpload, this.token, 'image')
                          .then((result: any) => {
                              this.team.avatar = result.team.avatar;
                              localStorage.setItem('identity', JSON.stringify(this.team));
                              console.log(this.team);
                              this.closeModal=true;
                          });
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

  public fileToUpload: Array<File>;
  fileChangeEvent(fileInput: any){

    let reader = new FileReader();
    let imagenSeleccionado = fileInput.target.files[0];
    let urlImagenTemp = reader.readAsDataURL(imagenSeleccionado);

    reader.onloadend = () => this.imagenTemp = reader.result;





    this.fileToUpload = <Array<File>>fileInput.target.files;
    //console.log(this.fileToUpload);
  }




}
