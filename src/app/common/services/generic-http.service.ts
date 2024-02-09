import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { ErrorService } from './error.service';
import { Observable } from 'rxjs';
import { environment } from './environment';

@Injectable({
  providedIn: 'root'
})
export class GenericHttpService {
  constructor(private httpclient: HttpClient) { }

  private baseUrl:string=""
  private url (requestParameter:Partial< RequestParameter>):string{
    return `${requestParameter.baseUrl? requestParameter.baseUrl: environment.baseUrl}/${requestParameter.controller}${requestParameter.action?`/${requestParameter.action}`:""}`
  }
//
// private url(controller?: string, action?: string): string {
//   return `${environment.baseUrl}/${controller}${action ? `/${action}` : ""}`;
// }
get<T>(requestParameters: Partial<RequestParameter>, id?: string): Observable<T>{
  let url: string ="";
  if(requestParameters.fullEndPoint)
  url = requestParameters.fullEndPoint;
  else
  url = `${this.url(requestParameters)}${id ? `/${id}` : ""}${requestParameters.querystring?`?${requestParameters.querystring}`:""}`;
  return this.httpclient.get<T>(url, {headers:requestParameters.headers})
}

//
// post<T>(requestParameters: Partial<RequestParameter>, body: Partial<T>) :Observable<T>{

//   let url:string = "";
//   if(requestParameters.fullEndPoint)
//   url = requestParameters.fullEndPoint;
//   else
//   url = `${this.url(requestParameters)}${requestParameters.querystring?`?${requestParameters.querystring}`:""}`;
//   return this.httpclient.post<T>(url, body,{ headers: requestParameters.headers});

// }
post<T>(requestParameter: Partial<RequestParameter>, body: Partial<T>): Observable<T> {
  let url: string = "";
  if (requestParameter.fullEndPoint)
    url = requestParameter.fullEndPoint;
  else
    url = `${this.url(requestParameter)}${requestParameter.querystring ? `?${requestParameter.querystring}` : ""}`

  return this.httpclient.post<T>(url, body, { headers: requestParameter.headers, responseType: requestParameter.responseType as 'json' });
}
put<T>(requestParameters: Partial<RequestParameter>, body: Partial<T>):Observable<T>{
  let url:string = "";
  if(requestParameters.fullEndPoint)
  url = requestParameters.fullEndPoint;
  else
  url = `${this.url(requestParameters)}${requestParameters.querystring?`?${requestParameters.querystring}`:""}`;

  return this.httpclient.put<T>(url,body,{headers: requestParameters.headers});

}

delete<T>(requestParameters:Partial<RequestParameter>,id: string): Observable<T>{
  let url : string = "";
  if(requestParameters.fullEndPoint)
    url = requestParameters.fullEndPoint;
  else
    url = `${this.url(requestParameters)}/${id}${requestParameters.querystring?`?${requestParameters.querystring}`:""}`;
  return this.httpclient.delete<T>(url, {headers: requestParameters.headers});
    }




}
export class RequestParameter{
  controller?: string;
  action?: string;
  // id?:string;
  headers?: HttpHeaders;
  baseUrl?:string;
  fullEndPoint?: string;
  querystring?:string;
  responseType?: string = 'json';

}
