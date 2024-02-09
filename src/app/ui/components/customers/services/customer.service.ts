import { Injectable } from '@angular/core';
import { GenericHttpService } from '../../../../common/services/generic-http.service';
import { CustomerModel } from '../models/customer.model';
import { Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  constructor(
    private httpClient:GenericHttpService
  ) { }
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
  update(){}

}
