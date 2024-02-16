import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable,firstValueFrom,of } from 'rxjs';
import { GenericHttpService } from '../../../../common/services/generic-http.service';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private jwtHelperService: JwtHelperService,
    private httpClient:GenericHttpService) { }
  identityCheck(){
    const token:string = localStorage.getItem("accessToken");
  //  const decodetoken = this.jwtHelperService.decodeToken(token);

  const expirationDate:Date = this.jwtHelperService.getTokenExpirationDate(token);
  let expired: boolean;

  try{
expired = this.jwtHelperService.isTokenExpired(token);

  }
  catch{
expired =true;
  }
  _isAuthencated = token !=null && !expired
  }
  get isAuthencated():boolean{
    return _isAuthencated;
  }
  getUserNameFromToken(accessToken: string): Observable<string> {
    const decodedToken = this.jwtHelperService.decodeToken(accessToken);
    const userName = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
    return of(userName);
  }
  async updatePassword(userId: string, resetToken: string, password: string, passwordConfirm: string, successCallBack?: () => void, errorCallBack?: (error:any) => void) {
    const observable: Observable<any> = this.httpClient.post({
      action: "password-update",
      controller: "auth"
    }, {
      userId: userId,
      resetToken: resetToken,
      password: password,
      passwordConfirm: passwordConfirm
    });

    const promiseData: Promise<any> = firstValueFrom(observable);
    promiseData.then(value => successCallBack()).catch(error => errorCallBack(error));
    await promiseData;
  }

}


export let _isAuthencated:boolean;
