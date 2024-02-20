import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Chart } from 'chart.js/auto';
import { EmployiesService } from '../employies/services/employies.service';
import { EmployeeDepartmentModel } from '../employies/models/employee.department.model';

@Component({
  selector: 'app-charts',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './charts.component.html',
  styleUrl: './charts.component.css'
})
export class ChartsComponent implements OnInit {
  title = 'ng-chart';
  chart: any = [];
  departments:EmployeeDepartmentModel;

constructor(
  private employeeService:EmployiesService
){
}
async ngOnInit() {
  this.departments= await this.employeeService.employeeDepartment();

  this.chart = new Chart('canvas', {
    type: 'pie',
    data: {
      labels: ['Administration', 'Sale', 'Marketing', 'Accounting', 'Technical', 'HumanResourcesUnit'],
      datasets: [
        {
          label: '# of Votes',
          data: [this.departments.administration, this.departments.sale, this.departments.marketing, this.departments.accounting, this.departments.technical, this.departments.humanResourcesUnit],
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}

}
