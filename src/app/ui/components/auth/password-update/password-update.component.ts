import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UserAuthService } from '../services/user-auth.service';
import { UserService } from '../../user/services/user.service';
import { ToastrService, ToastrType } from '../../../../common/services/toastr.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-password-update',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './password-update.component.html',
  styleUrl: './password-update.component.css'
})
export class PasswordUpdateComponent implements OnInit {
  constructor(
    private userAuthService:UserAuthService,
    private userService:UserService,
    private router:Router,
    private activatedRoute: ActivatedRoute,
    private toastrService:ToastrService,
    private authService: AuthService
  ){}
  state: any;
  ngOnInit(): void {
    this.activatedRoute.params.subscribe({
      next: async params => {
        const userId: string = params["userId"];
        const resetToken: string = params["resetToken"];
        this.state = await this.userAuthService.verifyResetToken(resetToken, userId, () => {
this.toastrService.toast(ToastrType.Info,"Token", "Token Sıfırlandı.")
        })
      }
    });
  }
  updatePassword(password: string, passwordConfirm: string) {

    if (password != passwordConfirm) {
     this.toastrService.toast(ToastrType.Error, "Başarısız", "Şifreler aynı değil!!!")
      return;
    }

    this.activatedRoute.params.subscribe({
      next: async params => {
      const userId: string = params["userId"];
      const resetToken: string = params["resetToken"];

     await this.authService.updatePassword(userId, resetToken, password, passwordConfirm,
      () => {
        this.router.navigate(["/login"])
        },
         error => {
        console.log(error)
        });
        this.toastrService.toast(ToastrType.Success, "Başarılı", "Şifreniz yenilenmiştir.")
      }
    })


  }

}
