import { Component, ElementRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ChartComponent } from './chart/chart.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CloudBeat';

  constructor(public dialog: MatDialog, public elementRef: ElementRef) { }

  openChart(patientId: number, name: string, dob: string, studyStartDate: string, studyEndTime: string, deviceSerialNumber: string, totalNumberOfEvents: number): void {
    const dialogRef = this.dialog.open(ChartComponent, {
      width: '800px',
      disableClose: true, // Prevent clicking outside the dialog
      data: {
        patientId,
        name,
        dob,
        studyStartDate,
        studyEndTime,
        deviceSerialNumber,
        totalNumberOfEvents
      }
    });
  }
}
