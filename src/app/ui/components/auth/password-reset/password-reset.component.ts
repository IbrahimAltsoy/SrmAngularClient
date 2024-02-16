import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserAuthService } from '../services/user-auth.service';
import { ToastrService, ToastrType } from '../../../../common/services/toastr.service';

@Component({
  selector: 'app-password-reset',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './password-reset.component.html',
  styleUrl: './password-reset.component.css'
})
export class PasswordResetComponent {
constructor(
  private userAuthService:UserAuthService,
  private toastrService: ToastrService
){}
passwordReset(email: string) {

  this.userAuthService.passwordReset(email, () => {
   this.toastrService.toast(ToastrType.Info, "Resetleme", "Şifrenizi değiştirmek için mailinize mesajı açınız.")
  })
}
}
