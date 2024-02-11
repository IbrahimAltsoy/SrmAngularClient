import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SectionComponent } from '../../../common/components/blank/section/section.component';
import { BlankComponent } from '../../../common/components/blank/blank.component';
import { NavModel } from '../../../common/components/blank/models/nav.model';
import { FormsModule } from '@angular/forms';
import { ValidInputDirective } from '../../../common/directives/valid-input.directive';
import { LoadingButtonComponent } from '../../../common/components/loading-button/loading-button.component';
import { EmployiesModel } from './models/employies.model';
import { ToastrService } from '../../../common/services/toastr.service';
import { SwalService } from '../../../common/services/swal.service';
import { EmployiesService } from './services/employies.service';
import { EmployeePipe } from './pipes/employee.pipe';

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

      }
  async getEmployies(){

    const response = await this.employiesService.read(this.currentPage, this.pageSize);
    this.employies = response.employies;
    this.totalItems = response.totalEmployiesCount;
    this.totalPages = Math.ceil(this.totalItems / this.pageSize);
  }
  update(employee: EmployiesModel){

  }
  remove(id:string){
    this.swalServise.callSwal("Sil", "Sil", `${id} id li çalışanı silmek istediğinizden emin misiniz`, ()=>{
     this.employiesService.remove(id);
      this.getEmployies();
    })
   }

}
