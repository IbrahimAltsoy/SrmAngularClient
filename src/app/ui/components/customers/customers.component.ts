import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BlankComponent } from '../../../common/components/blank/blank.component';
import { SectionComponent } from '../../../common/components/blank/section/section.component';
import { NavModel } from '../../../common/components/blank/models/nav.model';
import { CustomerService } from './services/customer.service';
import { CustomerModel } from './models/customer.model';
import { CustomerPipe } from './pipes/customer.pipe';
import { FormsModule } from '@angular/forms';
import { ValidInputDirective } from '../../../common/directives/valid-input.directive';
import { mode } from 'crypto-ts';
import { ToastrService, ToastrType } from '../../../common/services/toastr.service';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [CommonModule, RouterModule,BlankComponent,SectionComponent,CustomerPipe,FormsModule,ValidInputDirective],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css'
})
export class CustomersComponent {
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
filterText:string ="";
isAddForm:boolean =false;
customers:CustomerModel[] = [];
currentPage = 1;
  pageSize = 50;
  totalItems = 20;
  totalPages: number;
constructor(
  private customerService: CustomerService,
  private toastr:ToastrService
){
  this.getCustomers();
}


  async getCustomers(){

    const response = await this.customerService.read(this.currentPage, this.pageSize);
    this.customers = response.customers;
    this.totalItems = response.totalCustomerCount;
    this.totalPages = Math.ceil(this.totalItems / this.pageSize);
  }
  onPageChange(page: number) {
    this.currentPage = page;
    this.getCustomers();
  }
  @Output() created_Customer: EventEmitter<CustomerModel> = new EventEmitter();
  createCustomer(model: CustomerModel){
    const createCustomer: CustomerModel = new CustomerModel();
    createCustomer.identityNumber = model.identityNumber;
    createCustomer.companyName = model.companyName;
    this.customerService.create(createCustomer, (result:any)=>{
      this.toastr.toast(ToastrType.Success, "Başarılı", `${model.identityNumber} nolu şirket eklendi`)
    }, (errormessage:any)=>{
this.toastr.toast(ToastrType.Error, "Başarısız", "Şirket eklenemedi")
    });
    this.created_Customer.emit(createCustomer);
    this.isAddForm =false;


  }
  showAddForm(){
this.isAddForm = true;
  }
}
