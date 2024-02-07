import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CryptoService } from '../../../common/services/crypto.service';
import { UserLoginResponseModel } from '../auth/models/user.login.Response.model';
import { AuthService } from '../auth/services/auth.service';
import { NavbarComponent } from './navbar/navbar.component';
import { AsideComponent } from './aside/aside.component';
import { FooterComponent } from './footer/footer.component';
import { ControlSidebarComponent } from './control-sidebar/control-sidebar.component';

@Component({
  selector: 'app-layouts',
  standalone: true,
  imports: [CommonModule,RouterModule, NavbarComponent,AsideComponent, FooterComponent,ControlSidebarComponent],
  templateUrl: './layouts.component.html',
  styleUrl: './layouts.component.css'
})
export class LayoutsComponent implements OnInit {
 private username: string="";
constructor(
  private authService:AuthService
){}
  ngOnInit(): void {
    this.getUsername();
  }
  getUsername() {
    // this.username = localStorage.getItem("accessToken")
    // debugger
    // return this.username;
    // // AuthService'ten kullanıcı bilgilerini al
    const userDataString = localStorage.getItem("accessToken");

    if (userDataString) {
      const userData = JSON.parse(userDataString);
      this.username = userData.username;
    }
  }
}
