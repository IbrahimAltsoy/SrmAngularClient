import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-loading-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loading-button.component.html',
  styleUrl: './loading-button.component.css'
})
export class LoadingButtonComponent {
@Input() isloading:boolean =false;
@Input()form:NgForm;
@Input()btnName:string="";
@Input()btnLoadingName:string="";
@Input()btnClass:string = "btn-outline-primary w-100";
}
