import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ValidInputDirective } from '../../../../common/directives/valid-input.directive';
import { LoadingButtonComponent } from '../../../../common/components/loading-button/loading-button.component';
import { AuthService } from '../services/auth.service';
import { ToastrService, ToastrType } from '../../../../common/services/toastr.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule,FormsModule, ValidInputDirective,LoadingButtonComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  isloading :boolean =false;
  constructor(
    private authService: AuthService,
    private router:Router,
    private toastr: ToastrService
  ){
    toastr.toast(ToastrType.Info, "Giriş","Giriş Sayfasına Hoşgeldiniz.")
  }

login(form:NgForm){
  this.isloading =true;
  if(form.valid){
    this.authService.login(form.value)
    console.log(form.value)
    setTimeout(() => {
      this.isloading = false;

    }, 2000);
    this.router.navigateByUrl("/")

  }






}
}
