import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BlankComponent } from '../../../common/components/blank/blank.component';
import { SectionComponent } from '../../../common/components/blank/section/section.component';
import { NavModel } from '../../../common/components/blank/models/nav.model';
import { CustomerService } from './services/customer.service';
import { CustomerModel } from './models/customer.model';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [CommonModule, RouterModule,BlankComponent,SectionComponent],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css'
})
export class CustomersComponent implements OnInit {
navs: NavModel [] =[
  {
  routerLink:"/",
  class:"",
  name:"Anasayfa"
},
{
  routerLink:"/customers",
  class:"active",
  name:"Müsteriler"
}
];
customers:CustomerModel[] = [];
constructor(
  private customerService: CustomerService
){}
  ngOnInit(): void {
  //  this.getAll();
  }
// getAll(){
//   this.customerService.getAll(response=>this.customers = response);
// }
}
