import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root'
})
export class GenericHttpService {
  apiUrl: string = "";
  token: string = localStorage.getItem("accessToken")?.toString();
  constructor(
    private httpClient: HttpClient,
    private errorService: ErrorService
  ) { }
  get<T>(api: string, callBack: (res: T) => void, authorize: boolean = true, diffApi: boolean = false) {


    this.httpClient.get<T>(`${this.setApi(diffApi, api)}`, this.setOptions(authorize)).subscribe({
      next: (res) =>callBack(res),
      error: (_error:HttpErrorResponse)=> this.errorService.errorHandler(_error)

    });
  }

  post<T>(api: string, model: any, callBack: (res: T) => void, authorize: boolean = true, diffApi: boolean = false) {


    this.httpClient.post<T>(`${this.setApi(diffApi, api)}`, model, this.setOptions(authorize)).subscribe({
      next: (res) =>callBack(res),
      error: (_error:HttpErrorResponse)=> this.errorService.errorHandler(_error)
    });
  }

  setApi(diffApi: boolean, api: string) {
    if (diffApi)
      return api;
    return this.apiUrl + api;
  }

  setOptions(authorize: boolean) {
    if (authorize)
      return { headers: { "Authorization": `Bearer ${this.token}` } }
    return {}
  }

}
