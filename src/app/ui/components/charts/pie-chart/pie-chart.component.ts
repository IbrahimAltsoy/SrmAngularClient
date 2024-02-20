import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { EmployeeDepartmentModel } from '../../employies/models/employee.department.model';
import { EmployiesService } from '../../employies/services/employies.service';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pie-chart',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.css'
})
export class PieChartComponent implements OnInit {
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
          label: 'Employee Department',
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

