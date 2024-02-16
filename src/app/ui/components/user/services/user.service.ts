import { Injectable } from '@angular/core';
import { UserModel } from '../models/user.model';
import { Observable, firstValueFrom } from 'rxjs';
import { GenericHttpService } from '../../../../common/services/generic-http.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  isloading:boolean =true;
  constructor(
    private httpClient:GenericHttpService
  ) { }
  async update(model: UserModel, successCallBack?: () => void):Promise<void> {
    const observable:Observable<any> = this.httpClient.put({
    controller: "user"
     },model);
    await firstValueFrom(observable);
}

}
