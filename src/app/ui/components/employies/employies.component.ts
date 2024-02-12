import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SectionComponent } from '../../../common/components/blank/section/section.component';
import { BlankComponent } from '../../../common/components/blank/blank.component';
import { NavModel } from '../../../common/components/blank/models/nav.model';
import { FormsModule } from '@angular/forms';
import { ValidInputDirective } from '../../../common/directives/valid-input.directive';
import { LoadingButtonComponent } from '../../../common/components/loading-button/loading-button.component';
import { EmployiesModel } from './models/employies.model';
import { ToastrService, ToastrType } from '../../../common/services/toastr.service';
import { SwalService } from '../../../common/services/swal.service';
import { EmployiesService } from './services/employies.service';
import { EmployeePipe } from './pipes/employee.pipe';
import { EmployeeUpdateModel } from './models/employee.update.model';

@Component({
  selector: 'app-employies',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    BlankComponent,
    SectionComponent,
    FormsModule,
    ValidInputDirective,
    LoadingButtonComponent,
    EmployeePipe
  ],
  templateUrl: './employies.component.html',
  styleUrl: './employies.component.css'
})
export class EmployiesComponent {
  navs: NavModel [] =[
    {routerLink:"/", class:"", name:"Anasayfa"},
  { routerLink:"/employies", class:"active", name:"Çalışanlar"}
  ];
  isAddForm:boolean =false;
isloading:boolean =false;
isUpdateForm:boolean=false;
filterText:string ="";
employies:EmployiesModel[] = [];
updateEmployee:EmployiesModel = new EmployiesModel();
@Output() created_Employee: EventEmitter<EmployiesModel> = new EventEmitter();
currentPage = 1;
  pageSize = 6;
  totalItems = 20;
  totalPages: number;
  constructor(
    private employiesService: EmployiesService,
    private toastr:ToastrService,
    private swalServise: SwalService
  ){this.getEmployies()}
  onPageChange(page: number) {
    this.currentPage = page;
    this.getEmployies();
  }
  showAddForm(){
    this.isAddForm = true;
      }
      get(model: EmployiesModel){
        this.updateEmployee = {...model}
        this.isUpdateForm = true;
      }
  async getEmployies(){

    const response = await this.employiesService.read(this.currentPage, this.pageSize);
    this.employies = response.employies;
    this.totalItems = response.totalEmployiesCount;
    this.totalPages = Math.ceil(this.totalItems / this.pageSize);
  }
  createEmployee(model:EmployiesModel){
    this.isloading =true;
    const createEmployee: EmployiesModel = new EmployiesModel();
    createEmployee.name = model.name;
    createEmployee.surname = model.surname;
    createEmployee.phone = model.phone;
    createEmployee.email = model.email;
    createEmployee.photoPath = model.photoPath;
    createEmployee.identityNumber = model.identityNumber;
    // createEmployee.departmentId = departmenId

    this.employiesService.create(createEmployee, (result:any)=>{
      this.toastr.toast(ToastrType.Success, "Başarılı", `${model.name} nolu çalışan eklendi`)
    }, (errormessage:any)=>{
this.toastr.toast(ToastrType.Error, "Başarısız", "Çalışan eklenemedi")
    });
    this.created_Employee.emit(createEmployee);
    this.isloading=false;
     this.isAddForm =false;
    this.getEmployies();
  }
  async update(model: EmployeeUpdateModel){
    this.isUpdateForm = true;
    await this.employiesService.update(model)
    this.toastr.toast(ToastrType.Success, "Başarılı", `${model.id} id li çalışan başarılı bir şekilde güncellendi.`)
    this.isUpdateForm =false;
    this.getEmployies();
  }
  remove(id:string){
    this.swalServise.callSwal("Sil", "Sil", `${id} id li çalışanı silmek istediğinizden emin misiniz`, ()=>{
     this.employiesService.remove(id);
      this.getEmployies();
    })
   }

}
