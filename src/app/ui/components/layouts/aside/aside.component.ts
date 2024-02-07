import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {  RouterModule } from '@angular/router';
import { Navigations } from '../../../router/navigation';
import { AuthService } from '../../auth/services/auth.service';


@Component({
  selector: 'app-aside',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './aside.component.html',
  styleUrl: './aside.component.css'
})
export class AsideComponent {
  constructor(
        private authService :AuthService
  ){}
navigations = Navigations;
logout(){
  this.authService.logout();
}

}
