import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SectionComponent } from '../../../common/components/blank/section/section.component';
import { BlankComponent } from '../../../common/components/blank/blank.component';
import { NavModel } from '../../../common/components/blank/models/nav.model';
import { LoadingButtonComponent } from '../../../common/components/loading-button/loading-button.component';
import { ValidInputDirective } from '../../../common/directives/valid-input.directive';
import { DepartmentModel } from './models/department.model';
import { DepartmentService } from './services/department.service';
import { ToastrService, ToastrType } from '../../../common/services/toastr.service';
import { SwalService } from '../../../common/services/swal.service';

@Component({
  selector: 'app-department',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule,SectionComponent, BlankComponent, LoadingButtonComponent, ValidInputDirective],
  templateUrl: './department.component.html',
  styleUrl: './department.component.css'
})
export class DepartmentComponent {
  navs: NavModel [] =[
    { routerLink:"/",class:"", name:"Anasayfa"},
  { routerLink:"/departments",class:"active", name:"Departmanlar"}
  ];
  isAddForm:boolean =false;
  isloading:boolean =false;
  isUpdateForm:boolean=false;
  filterText:string ="";
  departments:DepartmentModel[] = [];
  updateDepartment:DepartmentModel = new DepartmentModel();
  @Output() created_Department: EventEmitter<DepartmentModel> = new EventEmitter();
  currentPage = 1;
    pageSize = 5;
    totalItems = 20;
    totalPages: number;
    constructor(
      private departmentService: DepartmentService,
      private toastr:ToastrService,
      private swalServise: SwalService
    ){this.getDepartments()}
    onPageChange(page: number) {
      this.currentPage = page;
      this.getDepartments();
    }
    showAddForm(){
      this.isAddForm = true;
        }
        get(model: DepartmentModel){
          this.updateDepartment = {...model}
          this.isUpdateForm = true;
        }
    async getDepartments(){

      const response = await this.departmentService.read(this.currentPage-1, this.pageSize);
      this.departments = response.departments;
      this.totalItems = response.totalDepartmentsCount;
      this.totalPages = Math.ceil(this.totalItems / this.pageSize);
    }
    createDepartment(model:DepartmentModel){
      this.isloading =true;
      const createDepartment: DepartmentModel = new DepartmentModel();
      createDepartment.name = model.name;
      this.departmentService.create(createDepartment, (result:any)=>{
        this.toastr.toast(ToastrType.Success, "Başarılı", `${model.name} nolu departman birimi eklendi`)
      }, (errormessage:any)=>{
  this.toastr.toast(ToastrType.Error, "Başarısız", "Departman birimi eklenemedi")
      });
      this.created_Department.emit(createDepartment);
      this.isloading=false;
       this.isAddForm =false;
      this.getDepartments();
    }
    async update(model: DepartmentModel){
      this.isUpdateForm = true;
      await this.departmentService.update(model)
      this.toastr.toast(ToastrType.Success, "Başarılı", `${model.id} id li departman birimi başarılı bir şekilde güncellendi.`)
      this.isUpdateForm =false;
      this.getDepartments();
    }
    remove(id:string){
      this.swalServise.callSwal("Sil", "Sil", `${id} id li departmanı silmek istediğinizden emin misiniz`, ()=>{
       this.departmentService.remove(id);
        this.getDepartments();
      })
     }

  }
