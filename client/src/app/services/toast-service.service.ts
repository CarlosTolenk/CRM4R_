import { Injectable } from '@angular/core';
declare var toastr:any

@Injectable()
export class ToastService {

  constructor() {
    this.setting()
   }

  Success(title :string, meassage?:string){
    toastr.success(title,meassage);
  }

  Warning(title :string, meassage?:string){
    toastr.warning(title,meassage);
  }

  Error(title :string, meassage?:string){
    toastr.error(title,meassage);
  }

  Info(title :string, meassage?:string){
    toastr.info(title,meassage);
  }

  setting(){
      toastr.options = {
        "closeButton": false,
        "debug": false,
        "newestOnTop": false,
        "progressBar": true,
        "positionClass": "toast-bottom-right",
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "3000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    }

  }

}
