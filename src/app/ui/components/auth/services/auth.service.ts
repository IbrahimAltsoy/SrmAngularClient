import { Injectable } from '@angular/core';
import { GenericHttpService } from '../../../../common/services/generic-http.service';
import { UserLoginResponseModel } from '../models/user.login.Response.model';
import { Router } from '@angular/router';
import { CryptoService } from '../../../../common/services/crypto.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
api:string ="https://localhost:8080/api/Auth/Login";
private userName: string="";
private accessToken: string | null = null;
  constructor(
    private httpClient:GenericHttpService,
    private router :Router,

  ) { }
  login(model:any){
this.httpClient.post<UserLoginResponseModel>(this.api, model, response=>{
  const userData = {
    username: response.userName
  };
  this.userName = userData.username;
  localStorage.setItem("accessToken",JSON.stringify(userData));
this.router.navigateByUrl("/")


})
  }
  getUserName(user:string):string {
user = this.userName;
    return  this.userName;
  }
  logout(){
    localStorage.removeItem("accessToken")
    this.router.navigateByUrl("/login");
  }
}
