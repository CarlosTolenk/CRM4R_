import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ClienteService } from '../../../services/cliente.services';
import { ToastService } from '../../../services/toast-service.service';
import { Cliente } from '../../../models/cliente';
import { GLOBAL } from '../../../services/global';
import { UploadServices } from '../../../services/upload.services';
import { TeamService } from '../../../services/team.services';

@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html',
  providers: [ClienteService,UploadServices,TeamService,ToastService],
  styleUrls: ['./editar-cliente.component.css']
})
export class EditarClienteComponent implements OnInit {

  public cliente:Cliente;
  public status:string;
  public url:string;
  public imagenTemp:string;
  public token;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _clienteService: ClienteService,
    private _uploadService: UploadServices,
    private _teamServices: TeamService,
    private _toastService: ToastService
  ) {
    //Darle estado inicial a las variables
    this.cliente = new Cliente('', '', '', '', '', '', '', 0, '', '', '', 0, '', 0, '', '');
    this.url = GLOBAL.url;
    this.token = this._teamServices.getToken();
  }

  ngOnInit() {
    this._route.params.subscribe(res => {
      this._clienteService.getCliente(res.id).subscribe(
        response => {
          if(!response.cliente){
            this.status = 'error';
          }else{
            this.cliente = response.cliente;
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
    });
  }

  onSubmit(){
    this._clienteService.updateCliente(this.cliente).subscribe(
      response => {
        if(!response.cliente){
          this.status = 'error';
        }else{
          this.cliente = response.cliente;

          //Subida de imagen de Cliente // upload-image-cliente/:id'
          if(this.fileToUpload){
          this._uploadService.makeFileRequest(this.url + 'upload-image-cliente/' + this.cliente._id, [], this.fileToUpload, this.token, 'image')
                    .then((result: any) => {
                        this.cliente.avatar = result.cliente.avatar;
                        this._toastService.Success("El Cliente","La actualización ha sido exitosa");
                        this._router.navigate(['home/clientes/ver/', this.cliente._id]);
                    });
        }else{
          this._toastService.Success("El cliente se ha actualizado correctamente", "Acción Completada");
          this._router.navigate(['home/clientes/ver/', this.cliente._id]);
        }


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

  volverListar(){
    this._router.navigate(['home/clientes']);
  }



}
