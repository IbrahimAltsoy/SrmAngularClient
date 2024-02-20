import { Component, OnInit } from '@angular/core';
import { SalePriceModel } from '../../sales/models/sale.price.model';
import { SalesService } from '../../sales/services/sales.service';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-polar-chart',
  standalone: true,
  imports: [],
  templateUrl: './polar-chart.component.html',
  styleUrl: './polar-chart.component.css'
})
export class PolarChartComponent implements OnInit {
  title = 'ng-chart';
  chart: any = [];
  salePrices:SalePriceModel;

constructor(
  private saleService:SalesService
){
}
async ngOnInit() {
  this.salePrices= await this.saleService.salePriceAmount();

  this.chart = new Chart('canvasSalePrice', {
    type: 'polarArea',
    data: {
      labels: ['Lower Price', 'Basic Price', 'Medium Price', 'Upper price'],
      datasets: [
        {
          label: 'Sales Price Amount',
          data: [this.salePrices.lowercPrice, this.salePrices.basicPrice,this.salePrices.mediumPrice,this.salePrices.upperPrice],
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
