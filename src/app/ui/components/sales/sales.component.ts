import { Component, EventEmitter, Output } from '@angular/core';
import { NavModel } from '../../../common/components/blank/models/nav.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SectionComponent } from '../../../common/components/blank/section/section.component';
import { BlankComponent } from '../../../common/components/blank/blank.component';
import { SalesModul } from './models/sales.modul';
import { SalesService } from './services/sales.service';
import { ToastrService, ToastrType } from '../../../common/services/toastr.service';
import { SwalService } from '../../../common/services/swal.service';
import { SalesPipe } from './pipes/sales.pipe';
import { ValidInputDirective } from '../../../common/directives/valid-input.directive';
import { LoadingButtonComponent } from '../../../common/components/loading-button/loading-button.component';

@Component({
  selector: 'app-sales',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, SectionComponent, BlankComponent,SalesPipe,ValidInputDirective,LoadingButtonComponent],
  templateUrl: './sales.component.html',
  styleUrl: './sales.component.css'
})
export class SalesComponent {
  navs: NavModel [] =[
    { routerLink:"/",class:"", name:"Anasayfa"},
  { routerLink:"/sales",class:"active", name:"Satışlar"}
  ];
  isAddForm:boolean =false;
  isloading:boolean =false;
  isUpdateForm:boolean=false;
  filterText:string ="";
  sales:SalesModul[] = [];
  updateSales:SalesModul = new SalesModul();

  currentPage = 1;
    pageSize = 10;
    totalItems = 20;
    totalPages: number;
  constructor(
    private salesService: SalesService,
    private toastr:ToastrService,
    private swalServise: SwalService
  ){
    this.getSales();
  }

    async getSales(){

      const response = await this.salesService.read(this.currentPage, this.pageSize);
      this.sales = response.sales;
      this.totalItems = response.totalSalesCount;
      this.totalPages = Math.ceil(this.totalItems / this.pageSize);
    }
    onPageChange(page: number) {
      this.currentPage = page;
      this.getSales();
    }
    @Output() created_Sales: EventEmitter<SalesModul> = new EventEmitter();
    createSales(model: SalesModul){
      this.isloading =true;
      const createSales: SalesModul = new SalesModul();
      createSales.name = model.name;
      createSales.description = model.description;
      createSales.saleDate = model.saleDate;
      createSales.saleAmount = model.saleAmount;
      // createSales.requestId = model.requestId;
      // createSales.employeeName = model.employeeName;
      createSales.employeeUserId = model.employeeUserId;

      this.salesService.create(createSales, (result:any)=>{
        this.toastr.toast(ToastrType.Success, "Başarılı", `${model.name} nolu ürün satışı gerçekleşti.`)
      }, (errormessage:any)=>{
  this.toastr.toast(ToastrType.Error, "Başarısız", "Şirket eklenemedi")
      });
      this.created_Sales.emit(createSales);
      this.isloading=false;
       this.isAddForm =false;
      this.getSales();
    }
    showAddForm(){
  this.isAddForm = true;
    }
     remove(id:string){
      this.swalServise.callSwal("Sil", `${id} id li satılan ürün bilgisini silmek istediğinizden emin misiniz?`,"", ()=>{
       this.salesService.remove(id);
        this.getSales();
      })
     }

    get(model:SalesModul){
      this.updateSales = {...model}
      this.isUpdateForm = true;
    }
   async update (model:SalesModul){
      this.isUpdateForm = true;
      await this.salesService.update(model)
      this.toastr.toast(ToastrType.Success, "Başarılı", `${model.id} id li ürün bilgisi başarılı bir şekilde güncellendi.`)
      this.isUpdateForm =false;
      this.getSales();

    }

  }
