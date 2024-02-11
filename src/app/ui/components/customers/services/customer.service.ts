import { Injectable, Input, input } from '@angular/core';
import { GenericHttpService } from '../../../../common/services/generic-http.service';
import { CustomerModel } from '../models/customer.model';
import { Observable, firstValueFrom } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService, ToastrType } from '../../../../common/services/toastr.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  constructor(
    private httpClient:GenericHttpService,
    private toastrService: ToastrService
  ) { }
  @Input() id:string;
  read(page: number = 0, size: number = 5): Promise<{ totalCustomerCount: number, customers: CustomerModel[] }> {
    const result: Observable<{ totalCustomerCount: number, customers: CustomerModel[] }> = this.httpClient.get<{ totalCustomerCount: number, customers: CustomerModel[] }>({
      controller: "customers",
      querystring: `page=${page}&size=${size}`
    });
    return result.toPromise();
}


create(customer: CustomerModel, successCallBack?: (result:any) => void, errorCallBack?: (errorMessage: string) => void){

  this.httpClient.post({
    controller: "customers"
  }, customer)
    .subscribe(result => {
      successCallBack(result);
    },(errorResponse:HttpErrorResponse)=>{
      const _error:Array<{key: string, value:Array<string>} >= errorResponse.error;
      let message = "";

      _error.forEach((v,index)=>{
        v.value.forEach((_v, _index)=>{
          console.log(_v)
          message+= `${_v}<br>`;

        });
      });

     errorCallBack(message);
    });

  }
  //
  async remove(id:string,successCallBack?: () => void, errorCallBack?: (errorMessage:string) => void){
    const deleteObservable: Observable<any>= this.httpClient.delete<any>({
       controller: "customers",
     },id);
     if(deleteObservable){
      this.toastrService.toast(ToastrType.Success, "Başarılı", `${id} id li şirket bilgisi başarılı bir şekilde silindi.`)
      await firstValueFrom(deleteObservable);
    }
    else{
      this.toastrService.toast(ToastrType.Success, "Başarılı", `Şirket bilgisi silinemedi.`)
    }

}
  async update(model: CustomerModel, successCallBack?: () => void):Promise<void> {
const observable:Observable<any> = this.httpClient.put({
          controller: "customers"
        },model);
        await firstValueFrom(observable);
      }
  }





