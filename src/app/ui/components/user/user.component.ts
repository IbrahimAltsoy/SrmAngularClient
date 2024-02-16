import { Component, OnInit } from '@angular/core';
import { NavModel } from '../../../common/components/blank/models/nav.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SectionComponent } from '../../../common/components/blank/section/section.component';
import { BlankComponent } from '../../../common/components/blank/blank.component';
import { LoadingButtonComponent } from '../../../common/components/loading-button/loading-button.component';
import { ValidInputDirective } from '../../../common/directives/valid-input.directive';
import { UserService } from './services/user.service';
import { UserModel } from './models/user.model';
import { AuthService } from '../auth/services/auth.service';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, SectionComponent, BlankComponent, LoadingButtonComponent, ValidInputDirective],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit {
  navs: NavModel [] =[
    { routerLink:"/",class:"", name:"Anasayfa"},
  { routerLink:"/users",class:"active", name:"Kullanıcılar"}
  ];
  constructor(
    private userService:UserService,
    private authService:AuthService
  ){}
  ngOnInit(): void {
    this.getUser();
  }
  username:string="";
  getUser() {
    const accessToken = localStorage.getItem("accessToken");
    this.authService.getUserNameFromToken(accessToken).subscribe(
      username => {
        this.username = username;
        return this.username;
      },
      error => {
        console.error('Kullanıcı adı alınamadı:', error);
      }
    );
  }

  update(model:UserModel){
this.userService.update(model)
  }
}
