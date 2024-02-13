import { Component } from '@angular/core';
import { NavModel } from '../../../common/components/blank/models/nav.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SectionComponent } from '../../../common/components/blank/section/section.component';
import { BlankComponent } from '../../../common/components/blank/blank.component';
import { LoadingButtonComponent } from '../../../common/components/loading-button/loading-button.component';
import { ValidInputDirective } from '../../../common/directives/valid-input.directive';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, SectionComponent, BlankComponent, LoadingButtonComponent, ValidInputDirective],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  navs: NavModel [] =[
    { routerLink:"/",class:"", name:"Anasayfa"},
  { routerLink:"/users",class:"active", name:"Kullanıcılar"}
  ];
}
