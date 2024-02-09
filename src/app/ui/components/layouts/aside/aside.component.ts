import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {  RouterModule } from '@angular/router';
import { Navigations } from '../../../router/navigation';
import { AuthService } from '../../auth/services/auth.service';
import { UserAuthService } from '../../auth/services/user-auth.service';


@Component({
  selector: 'app-aside',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './aside.component.html',
  styleUrl: './aside.component.css'
})
export class AsideComponent implements OnInit{
  username: string="";
  constructor(
        private authService :AuthService,
        private userAuthService: UserAuthService
  ){}
  ngOnInit(): void {
    this.getUser();
  }
navigations = Navigations;
getUser() {
  const accessToken = localStorage.getItem("accessToken");
  this.authService.getUserNameFromToken(accessToken).subscribe(
    username => {

      this.username = username;
      // debugger
      return this.username;

    },
    error => {
      console.error('Kullanıcı adı alınamadı:', error);
    }
  );
}
logout(){
  this.userAuthService.logout();
}

}
