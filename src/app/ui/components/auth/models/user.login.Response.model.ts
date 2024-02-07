import { TokenModel } from "./token.Model";

export class UserLoginResponseModel{
  accessToken:TokenModel = new TokenModel();
  message: string ="";
  userName:string ="";
}
