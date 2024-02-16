import { Injectable } from '@angular/core';
import { GenericHttpService } from '../../../../common/services/generic-http.service';
import { Observable, firstValueFrom } from 'rxjs';
import { TokenModel } from '../models/token.Model';
import { SocialUser } from 'angularx-social-login';
import { Router } from '@angular/router';
import { RegisterUserModel } from '../register/models/register.user.model';


@Injectable({
  providedIn: 'root'
})
export class UserAuthService {
  constructor(
    private httpClient: GenericHttpService,
    private router:Router
    ) { }
  async login(userNameOrEmail: string,password: string, callBack?:()=>void):Promise<any> {
    const observable: Observable<any | TokenModel> = this.httpClient.post<any | TokenModel>({
      controller:"auth",
      action:"login"
    },{userNameOrEmail, password})



    const tokenResponse: TokenModel =await firstValueFrom(observable) as TokenModel;
    if(tokenResponse){

      localStorage.setItem("accessToken", tokenResponse.accessToken.accessToken)
      localStorage.setItem("refreshToken", tokenResponse.accessToken.refreshToken)

    }
    callBack();
  }
  async refreshTokenLogin(refreshToken:string, callBack?:(state:any)=>void):Promise<any>{
    const observable :Observable<any | TokenModel> = await this.httpClient.post({
      controller:"auth",
      action: "refreshtokenlogin"
    }, {refreshToken: refreshToken})

    try {
      const tokenResponse: TokenModel = await firstValueFrom(observable) as TokenModel
    if(tokenResponse){
      localStorage.setItem("accessToken", tokenResponse.accessToken.accessToken);
              localStorage.setItem("refreshToken", tokenResponse.accessToken.refreshToken);
              callBack(refreshToken?true:false);
    }

    } catch  {
      callBack(false);
    }



          }
  async passwordReset(email: string, callBack?: () => void) {
        const observable: Observable<any> = this.httpClient.post({
        controller: "auth",
        action: "password-reset"
       }, { email: email });

       await firstValueFrom(observable);
     callBack();
    }
  async verifyResetToken(resetToken:string, userId:string, callBack?:()=>void):Promise<boolean>{
    const observable:Observable<any> = await this.httpClient.post({
      controller:"auth",
      action:"verify-reset-token"
    },{
      resetToken:resetToken,
      userId:userId
    })
  const state:boolean =  await firstValueFrom(observable);
    callBack();
    return state;
  };


  async googleLogin(user: SocialUser, succesBack?:()=>void, callBack?:()=>void):Promise<any>{
    const observable: Observable<SocialUser | TokenModel> = this.httpClient.post<SocialUser | TokenModel>({
      action: "google-login",
      controller: "auth"
    }, user);


    const tokenResponse: TokenModel = await firstValueFrom(observable) as TokenModel;
    if(tokenResponse){
      localStorage.setItem("accessToken", tokenResponse.accessToken.accessToken);
      localStorage.setItem("refreshToken", tokenResponse.accessToken.refreshToken);

    }
   // callBack();

  }
  async register(user:RegisterUserModel):Promise<RegisterUserModel>{
    const observable:Observable< RegisterUserModel> = this.httpClient.post<RegisterUserModel>({
      controller:"user"
    },user);

return await firstValueFrom(observable) as RegisterUserModel;
  }
  logout(){
    localStorage.removeItem("accessToken")
    this.router.navigateByUrl("/login")

  }
  }
