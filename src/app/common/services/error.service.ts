import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService, ToastrType } from './toastr.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(
    private toastr: ToastrService
  ) { }
  errorHandler(error:HttpErrorResponse){
    switch (error.status) {
      case 0:
        this.toastr.toast(ToastrType.Error,"Hata!","Api adresine ulaşılamıyor!");
        break;
      case 404:
        this.toastr.toast(ToastrType.Error,"Hata!","Api adresi bulunamıyor!");
        break;
      case 500:
        if(error.error.Errors){
          let errors:any = error.error.Errors;
          errors.forEach((element:any) => {
            this.toastr.toast(ToastrType.Error,"Hata!",element);
          });
        }else{
          this.toastr.toast(ToastrType.Error,"Hata!",error.error.Message);
        }
       break;
      default:
        break;
    }

    console.log(error);
  }
}
