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
import { LoadingButtonComponent } from '../../../common/components/loading-button/loading-button.component';
import { SwalService } from '../../../common/services/swal.service';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [
    CommonModule,
     RouterModule,
     BlankComponent,
     SectionComponent,
     CustomerPipe,
     FormsModule,
     ValidInputDirective,
    LoadingButtonComponent],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css'
})
export class CustomersComponent {
navs: NavModel [] =[
  { routerLink:"/",class:"", name:"Anasayfa"},
{ routerLink:"/customers",class:"active", name:"Müsteriler"}
];

isAddForm:boolean =false;
isloading:boolean =false;
isUpdateForm:boolean=false;
filterText:string ="";
customers:CustomerModel[] = [];
updateCustomer:CustomerModel = new CustomerModel();

currentPage = 1;
  pageSize = 6;
  totalItems = 20;
  totalPages: number;
constructor(
  private customerService: CustomerService,
  private toastr:ToastrService,
  private swalServise: SwalService
){
  this.getCustomers();
}

  async getCustomers(){

    const response = await this.customerService.read(this.currentPage-1, this.pageSize);
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
    this.isloading =true;
    const createCustomer: CustomerModel = new CustomerModel();
    createCustomer.identityNumber = model.identityNumber;
    createCustomer.companyName = model.companyName;
    this.customerService.create(createCustomer, (result:any)=>{

      this.toastr.toast(ToastrType.Success, "Başarılı", `${model.identityNumber} nolu şirket eklendi`)
    }, (errormessage:any)=>{
this.toastr.toast(ToastrType.Error, "Başarısız", "Şirket eklenemedi")
    });
    this.created_Customer.emit(createCustomer);
    this.getCustomers();
    this.isloading=false;

     this.isAddForm =false;

  }
  showAddForm(){
this.isAddForm = true;
  }
   remove(id:string){
    this.swalServise.callSwal("Sil", "Sil", "şirket bilgisini silmek istediğinizden emin misiniz?", ()=>{
     this.customerService.remove(id);
      this.getCustomers();
    })
   }

  get(model:CustomerModel){
    this.updateCustomer = {...model}
    this.isUpdateForm = true;
  }
 async update (model:CustomerModel){
    this.isUpdateForm = true;
    await this.customerService.update(model)
    this.toastr.toast(ToastrType.Success, "Başarılı", `${model.id} id li şirket başarılı bir şekilde güncellendi.`)
    this.isUpdateForm =false;
    this.getCustomers();

  }

}
