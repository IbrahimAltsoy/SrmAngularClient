import { Injectable, Input } from '@angular/core';
import { GenericHttpService } from '../../../../common/services/generic-http.service';
import { ToastrService, ToastrType } from '../../../../common/services/toastr.service';
import { RequestModel } from '../models/request.model';
import { Observable, firstValueFrom } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { RequestStatuModel } from '../models/request.statu.model';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(
    private httpClient:GenericHttpService,
    private toastrService: ToastrService
  ) { }
  @Input() id:string;
  read(page: number = 0, size: number = 5): Promise<{ totalRequestCount: number, requests: RequestModel[] }> {
    const result: Observable<{ totalRequestCount: number, requests: RequestModel[] }> = this.httpClient.get<{ totalRequestCount: number, requests: RequestModel[] }>({
      controller: "requests",
      querystring: `page=${page}&size=${size}`
    });
    return result.toPromise();
}


create(request: RequestModel, successCallBack?: (result:any) => void, errorCallBack?: (errorMessage: string) => void){

  this.httpClient.post({
    controller: "requests"
  }, request)
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
       controller: "requests",
     },id);
     if(deleteObservable){
      this.toastrService.toast(ToastrType.Success, "Başarılı", `${id} id li istek bilgisi başarılı bir şekilde silindi.`)
      await firstValueFrom(deleteObservable);
    }
    else{
      this.toastrService.toast(ToastrType.Success, "Başarılı", `Şirket bilgisi silinemedi.`)
    }

}
  async update(model: RequestModel, successCallBack?: () => void):Promise<void> {
const observable:Observable<any> = this.httpClient.put({
          controller: "requests"
        },model);
        await firstValueFrom(observable);
      }
      async updateRequestStatus(model:RequestModel, successCallBack?: () => void):Promise<void>{
        const observable:Observable<any> = this.httpClient.put({
          controller:"requests",
          action:"request-status"
        },model)
        await firstValueFrom(observable);
      }
      requestStatu: RequestStatuModel;
  async employeeDepartment():Promise<RequestStatuModel>{
    const result =await this.httpClient.get<RequestStatuModel>({
      controller:"requests",
      action:"request-status-count"
    }).toPromise();
  this.requestStatu = result
    return this.requestStatu;
  }
  }
