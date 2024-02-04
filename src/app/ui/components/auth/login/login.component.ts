import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ValidInputDirective } from '../../../../common/directives/valid-input.directive';
import { GenericHttpService } from '../../../../common/services/generic-http.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule,FormsModule, ValidInputDirective],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(
    private genericHttp: GenericHttpService
  ){}

login(model:any){

   this.genericHttp.post("https://localhost:8080/api/Auth/Login", model, ()=>{
    console.log(model)
   });



}
}
