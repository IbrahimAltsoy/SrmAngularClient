import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SectionComponent } from '../../../common/components/blank/section/section.component';
import { BlankComponent } from '../../../common/components/blank/blank.component';
import { NavModel } from '../../../common/components/blank/models/nav.model';

@Component({
  selector: 'app-department',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule,SectionComponent, BlankComponent],
  templateUrl: './department.component.html',
  styleUrl: './department.component.css'
})
export class DepartmentComponent {
  navs: NavModel [] =[
    { routerLink:"/",class:"", name:"Anasayfa"},
  { routerLink:"/departments",class:"active", name:"Departmanlar"}
  ];
}
