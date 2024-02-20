import { Injectable, Input } from '@angular/core';
import { GenericHttpService } from '../../../../common/services/generic-http.service';
import { ToastrService, ToastrType } from '../../../../common/services/toastr.service';
import { SalesModul } from '../models/sales.modul';
import { Observable, firstValueFrom } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { SalePriceModel } from '../models/sale.price.model';

@Injectable({
  providedIn: 'root'
})
export class SalesService {

  constructor(
    private httpClient:GenericHttpService,
    private toastrService: ToastrService
  ) { }
  @Input() id:string;
  read(page: number = 0, size: number = 5): Promise<{ totalSalesCount: number, sales: SalesModul[] }> {
    const result: Observable<{ totalSalesCount: number, sales: SalesModul[] }> = this.httpClient.get<{ totalSalesCount: number, sales: SalesModul[] }>({
      controller: "sales",
      querystring: `page=${page}&size=${size}`
    });
    return result.toPromise();
}


create(sales: SalesModul, successCallBack?: (result:any) => void, errorCallBack?: (errorMessage: string) => void){

  this.httpClient.post({
    controller: "sales"
  }, sales)
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
       controller: "sales",
     },id);
     if(deleteObservable){
      this.toastrService.toast(ToastrType.Success, "Başarılı", `${id} id li satış başarılı bir şekilde silindi.`)
      await firstValueFrom(deleteObservable);
    }
    else{
      this.toastrService.toast(ToastrType.Success, "Başarılı", `Satş ürün bilgisi silinemedi.`)
    }

}
  async update(model: SalesModul, successCallBack?: () => void):Promise<void> {
const observable:Observable<any> = this.httpClient.put({
          controller: "sales"
        },model);
        await firstValueFrom(observable);
      }
      salePrices: SalePriceModel;
  async salePriceAmount():Promise<SalePriceModel>{
    const result =await this.httpClient.get<SalePriceModel>({
      controller:"sales",
      action:"sale-price"
    }).toPromise();
  this.salePrices = result
    return this.salePrices;
  }
  }
