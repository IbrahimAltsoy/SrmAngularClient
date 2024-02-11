import { Injectable } from '@angular/core';
import  Swal  from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SwalService {
  constructor() { }
  callSwal(confirmbtnName: string, title:string, text:string, callBack:()=>void){
    Swal.fire({
      showCancelButton: true,
      showConfirmButton:true,
      cancelButtonText: "Vazgeç",
      confirmButtonText:confirmbtnName,
      icon:'warning',
      title: title
    }).then(result=>{
      if(result.isConfirmed){
        callBack();
      }
    })
  }
}
