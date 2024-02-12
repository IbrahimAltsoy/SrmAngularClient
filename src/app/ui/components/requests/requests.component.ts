import { Component } from '@angular/core';
import { NavModel } from '../../../common/components/blank/models/nav.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SectionComponent } from '../../../common/components/blank/section/section.component';
import { BlankComponent } from '../../../common/components/blank/blank.component';

@Component({
  selector: 'app-requests',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, SectionComponent, BlankComponent],
  templateUrl: './requests.component.html',
  styleUrl: './requests.component.css'
})
export class RequestsComponent {
  navs: NavModel [] =[
    { routerLink:"/",class:"", name:"Anasayfa"},
  { routerLink:"/requests",class:"active", name:"İstekler"}
  ];
}
