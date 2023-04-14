import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import * as Highcharts from 'highcharts';
import HCXrange from 'highcharts/modules/xrange';

HCXrange(Highcharts);

@Component({
  selector: 'my-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ChartComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onCloseClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    const options: Highcharts.Options = {
      chart: {
        type: 'xrange'
      },
      title: {
        text: 'My Chart'
      },
      xAxis: {
        categories: ['Category 1', 'Category 2', 'Category 3']
      },
      yAxis: {
        title: {
          text: 'Value'
        }
      },
      series: [{
        type: 'xrange',
        name: 'Series 1',
        data: [{
          x: Date.UTC(2022, 1, 1),
          x2: Date.UTC(2022, 1, 3),
          y: 1
        }, {
          x: Date.UTC(2022, 1, 4),
          x2: Date.UTC(2022, 1, 6),
          y: 2
        }, {
          x: Date.UTC(2022, 1, 7),
          x2: Date.UTC(2022, 1, 9),
          y: 3
        }]
      }, {
        type: 'xrange',
        name: 'Series 2',
        data: [{
          x: Date.UTC(2022, 1, 1),
          x2: Date.UTC(2022, 1, 3),
          y: 4
        }, {
          x: Date.UTC(2022, 1, 4),
          x2: Date.UTC(2022, 1, 6),
          y: 5
        }, {
          x: Date.UTC(2022, 1, 7),
          x2: Date.UTC(2022, 1, 9),
          y: 6
        }]
      }]
    };

    Highcharts.chart('container', options);
  }

}