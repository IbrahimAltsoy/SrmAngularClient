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
export class LayoutsComponent {

constructor(){}
}
