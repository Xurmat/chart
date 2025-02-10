import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ApexNonAxisChartSeries, ApexChart, ApexDataLabels, ApexLegend, ApexTitleSubtitle
} from 'ng-apexcharts';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import {  } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [NgApexchartsModule, HttpClientModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppComponent implements OnInit {
  title = 'Pie_Chart';
  API_URL = 'https://kep.uz/api/problems-rating/admin/statistics-by-topic/?';

  public chartOptions!: {
    series: ApexNonAxisChartSeries;
    chart: ApexChart;
    labels: string[];
    dataLabels: ApexDataLabels;
    legend:ApexLegend;
    chartTitle:ApexTitleSubtitle
  };

  constructor(private _http: HttpClient){
    this.chartOptions = {
      series: [10,20, 30, 40, 50],
      chart: {
        type: 'pie',
        height: 350,
      },
      labels: ["google", "google", "google", "google", "google"],
      dataLabels: {
        enabled: false,
      },
      legend: {
        position:'bottom'
      },
      chartTitle:{
        text: "Problems statistics by topic",
        align: 'center'
      }
    };
  }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(){
    this._http.get(this.API_URL).subscribe({
      next: (res) => {
        if(res && Array.isArray(res)){
          this.getChartData(res);
        }
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  getChartData(data: any[]){
    this.chartOptions.labels.length = 0;
    this.chartOptions.series.length = 0;

    data.forEach(item => {
      this.chartOptions.labels.push(item.topic);
      this.chartOptions.series.push(item.solved);
    });
  }
}