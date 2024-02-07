import { Injectable } from '@angular/core';
import { GenericHttpService } from '../../../../common/services/generic-http.service';
import { CustomerModel } from '../models/customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(
    private httpClient:GenericHttpService
  ) { }
  getAll(callBack:(response:CustomerModel[])=>void){
    this.httpClient.get<CustomerModel[]>("https://localhost:8080/api/Customers?Page=1&Size=5",response=>callBack(response))
  }
  //
  post(){}
  //
  update(){}

}
