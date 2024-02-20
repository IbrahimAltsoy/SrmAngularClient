import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PieChartComponent } from '../charts/pie-chart/pie-chart.component';
import { BarChartComponent } from '../charts/bar-chart/bar-chart.component';
import { PolarChartComponent } from '../charts/polar-chart/polar-chart.component';
declare var $:any;

@Component({
  selector: 'app-blank',
  standalone: true,
  imports: [RouterModule,CommonModule, FormsModule,PieChartComponent, BarChartComponent,PolarChartComponent ],
  templateUrl: './blank.component.html',
  styleUrl: './blank.component.css'
})
export class BlankComponent {}
