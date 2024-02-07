import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot,CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree  } from '@angular/router';
import { Observable } from 'rxjs';
@Injectable({
  providedIn:"root"
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private rooter:Router){}
  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    return this.canActivate(childRoute,state)
  }
  canActivate(
    route: ActivatedRouteSnapshot,
     state: RouterStateSnapshot){
      if(!localStorage.getItem("accessToken")){
          this.rooter.navigateByUrl("/login");
          return false;
      }
      return true;
  }
}
