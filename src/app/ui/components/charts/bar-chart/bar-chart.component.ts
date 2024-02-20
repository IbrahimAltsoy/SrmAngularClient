import { Component, OnInit } from '@angular/core';
import { RequestStatuModel } from '../../requests/models/request.statu.model';
import { RequestService } from '../../requests/services/request.service';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-bar-chart',
  standalone: true,
  imports: [],
  templateUrl: './bar-chart.component.html',
  styleUrl: './bar-chart.component.css'
})
export class BarChartComponent implements OnInit {
  title = 'ng-chart';
  chart: any = [];
  requestStatus:RequestStatuModel;

constructor(
  private requestService:RequestService
){
}
async ngOnInit() {
  this.requestStatus= await this.requestService.employeeDepartment();

  this.chart = new Chart('canvasbar', {
    type: 'bar',
    data: {
      labels: ['True', 'False'],
      datasets: [
        {
          label: 'Request Status',
          data: [this.requestStatus.statusTrue, this.requestStatus.statusFalse],
          borderWidth: 1,
          backgroundColor: ['#75E552', '#DC6045']
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
