import { Injectable, Input } from '@angular/core';
import { GenericHttpService } from '../../../../common/services/generic-http.service';
import { ToastrService, ToastrType } from '../../../../common/services/toastr.service';
import { DepartmentModel } from '../models/department.model';
import { Observable, firstValueFrom } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(
    private httpClient:GenericHttpService,
    private toastrService: ToastrService
  ) { }
  @Input() id:string;
  read(page: number = 0, size: number = 5): Promise<{ totalDepartmentsCount: number, departments: DepartmentModel[] }> {
    const result: Observable<{ totalDepartmentsCount: number, departments: DepartmentModel[] }> = this.httpClient.get<{ totalDepartmentsCount: number, departments: DepartmentModel[] }>({
      controller: "departments",
      querystring: `page=${page}&size=${size}`
    });
    return result.toPromise();
}
create(department: DepartmentModel, successCallBack?: (result:any) => void, errorCallBack?: (errorMessage: string) => void){

  this.httpClient.post({
    controller: "departments"
  }, department)
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
  async remove(id:string,successCallBack?: () => void, errorCallBack?: (errorMessage:string) => void){
    const deleteObservable: Observable<any>= this.httpClient.delete<any>({
       controller: "departments",
     },id);
     if(deleteObservable){
      this.toastrService.toast(ToastrType.Success, "Başarılı", `${id} id li departman birimi başarılı bir şekilde silindi.`)
      await firstValueFrom(deleteObservable);
    }
    else{
      this.toastrService.toast(ToastrType.Success, "Başarılı", `Çalışan bilgisi silinemedi.`)
    }

}
async update(model: DepartmentModel, successCallBack?: () => void):Promise<void> {
  const observable:Observable<any> = this.httpClient.put({
            controller: "departments"
          },model);
          await firstValueFrom(observable);
        }
}
