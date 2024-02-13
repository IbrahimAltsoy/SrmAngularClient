import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ValidInputDirective } from '../../../../common/directives/valid-input.directive';
import { LoadingButtonComponent } from '../../../../common/components/loading-button/loading-button.component';
import { ToastrService, ToastrType } from '../../../../common/services/toastr.service';
import { UserAuthService } from '../services/user-auth.service';
import { RegisterUserModel } from './models/register.user.model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterModule,FormsModule, ValidInputDirective,LoadingButtonComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  isloading :boolean =false;
  constructor(
    private router:Router,
    private toastr: ToastrService,
    private userAuthService: UserAuthService,
 ){

  }
  async register(user:RegisterUserModel){
    await this.userAuthService.register(user);
    this.toastr.toast(ToastrType.Success,"Başarlı", "Kayıt olundu.")
    this.router.navigateByUrl("/login");

  }
}
