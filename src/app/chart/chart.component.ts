import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import * as Highcharts from 'highcharts';
import HCXrange from 'highcharts/modules/xrange';
import { PatientEvent } from '../app.component';

HCXrange(Highcharts);

@Component({
  selector: 'my-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  patientName: string = '';
  minHeartRate: number = 0;
  avgHeartRate: number = 0;
  maxHeartRate: number = 0;

  constructor(
    public dialogRef: MatDialogRef<ChartComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onCloseClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    const events = this.data.events;

    // Calculate patient name, minimum heart rate, average heart rate, and maximum heart rate
    this.patientName = this.data.name;
    const heartRates = events.map((event: PatientEvent) => event.heartRateBPM);
    this.minHeartRate = Math.min(...heartRates);
    this.avgHeartRate = Math.round(heartRates.reduce((a: number, b: number) => a + b, 0) / heartRates.length);
    this.maxHeartRate = Math.max(...heartRates);

    // Create Highcharts options
    const options: Highcharts.Options = {
      chart: {
        type: 'line'
      },
      title: {
        text: 'Patient Events'
      },
      xAxis: {
        categories: events.map((event: PatientEvent) => event.date)
      },
      yAxis: {
        title: {
          text: 'Heart Rate (BPM)'
        }
      },
      series: [
        {
          name: 'Heart Rate',
          type: 'line',
          data: events.map((event: PatientEvent) => event.heartRateBPM)
        }
      ]
    };

    Highcharts.chart('container', options);
  }
}
