import { Component, EventEmitter, Output } from '@angular/core';
import { NavModel } from '../../../common/components/blank/models/nav.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SectionComponent } from '../../../common/components/blank/section/section.component';
import { BlankComponent } from '../../../common/components/blank/blank.component';
import { ValidInputDirective } from '../../../common/directives/valid-input.directive';
import { LoadingButtonComponent } from '../../../common/components/loading-button/loading-button.component';
import { RequestPipe } from './pipes/request.pipe';
import { RequestModel } from './models/request.model';
import { RequestService } from './services/request.service';
import { ToastrService, ToastrType } from '../../../common/services/toastr.service';
import { SwalService } from '../../../common/services/swal.service';
import { mode } from 'crypto-ts';

@Component({
  selector: 'app-requests',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, SectionComponent, BlankComponent, ValidInputDirective,
    LoadingButtonComponent,RequestPipe],
  templateUrl: './requests.component.html',
  styleUrl: './requests.component.css'
})
export class RequestsComponent {
  navs: NavModel [] =[
    { routerLink:"/",class:"", name:"Anasayfa"},
  { routerLink:"/requests",class:"active", name:"İstekler"}
  ];
  isAddForm:boolean =false;
isloading:boolean =false;
isUpdateForm:boolean=false;
filterText:string ="";
requests:RequestModel[] = [];
updateReuest:RequestModel = new RequestModel();

currentPage = 1;
  pageSize = 10;
  totalItems = 504;
  totalPages: number;
constructor(
  private requestService: RequestService,
  private toastr:ToastrService,
  private swalServise: SwalService
){
  this.getRequests();
}

  async getRequests(){

    const response = await this.requestService.read(this.currentPage-1, this.pageSize);
    this.requests = response.requests;
    this.totalItems = response.totalRequestCount;
    this.totalPages = Math.ceil(this.totalItems / this.pageSize);
  }
  onPageChange(page: number) {
    this.currentPage = page;
    this.getRequests();
  }
  @Output() created_Request: EventEmitter<RequestModel> = new EventEmitter();
  createRequest(model: RequestModel){
    this.isloading =true;
    const createRequest: RequestModel = new RequestModel();
    createRequest.customerUserId = model.customerUserId;
    createRequest.employeeUserId = model.employeeUserId;
    createRequest.requestStatusId = model.requestStatusId;
    createRequest.description = model.description;
    this.requestService.create(createRequest, (result:any)=>{
      this.toastr.toast(ToastrType.Success, "Başarılı", `${model.id} nolu istek eklendi`)
    }, (errormessage:any)=>{
this.toastr.toast(ToastrType.Error, "Başarısız", "İstek eklenemedi")
    });
    this.created_Request.emit(createRequest);
    this.isloading=false;
     this.isAddForm =false;
    this.getRequests();
  }
  showAddForm(){
this.isAddForm = true;
this.isUpdateForm =false;
  }
   remove(id:string){
    this.swalServise.callSwal("Sil", "Sil", "istek bilgisini silmek istediğinizden emin misiniz?", ()=>{
     this.requestService.remove(id);
      this.getRequests();
    })
   }

  get(model:RequestModel){
    this.updateReuest = {...model}
    this.isUpdateForm = true;
    this.isAddForm =false;
  }
 async update (model:RequestModel){
    this.isUpdateForm = true;
    await this.requestService.update(model)
    this.toastr.toast(ToastrType.Success, "Başarılı", `${model.id} id li istek başarılı bir şekilde güncellendi.`)
    this.isUpdateForm =false;
    this.getRequests();

  }
 async changeStatus(model:RequestModel){
    await this.requestService.updateRequestStatus(model);
    this.toastr.toast(ToastrType.Success, "Başarılı", "İsteğin durumu değiştirildi.")
    this.getRequests();
  }
}
