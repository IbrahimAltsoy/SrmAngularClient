import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
declare var $:any;

@Component({
  selector: 'app-blank',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './blank.component.html',
  styleUrl: './blank.component.css'
})
export class BlankComponent {}
