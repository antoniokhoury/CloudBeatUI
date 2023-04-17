import { Component } from '@angular/core';
import { DialogPosition, MatDialog } from '@angular/material/dialog';
import { ChartComponent } from './chart/chart.component';
import { HttpClient } from '@angular/common/http';
import axios from 'axios';
import { environment } from 'environment';

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: Date;
  studyStartTime: Date;
  studyEndTime: Date;
  device: PatientDevice;
  events: PatientEvent[];
}

export interface PatientDevice {
  id: string;
  serialNumber: string;
}

export interface PatientEvent {
  id: string;
  type: string;
  heartRateBPM: number;
  date: Date;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  patients: Patient[] = [];
  paginatedPatients: Patient[] = [];
  displayedColumns: string[] = ['id', 'name', 'dateOfBirth', 'studyStartTime', 'studyEndTime', 'deviceSerialNumber', 'totalNumberOfEvents'];
  pageSize: number = 10;
  page: number = 0;
  totalPatients: number = 0;

  constructor(public dialog: MatDialog, private http: HttpClient) { }

  ngOnInit() {
    this.loadPatients();
  }

  loadPatients() {
    axios
      .get(`${environment.baseUrl}/Patients`, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then((response) => {
        this.patients = response.data;
        this.paginatedPatients = this.patients.slice(
          this.page * this.pageSize,
          (this.page + 1) * this.pageSize
        );
        this.totalPatients = this.patients.length;
      })
      .catch((error) => {
        console.log('Error:', error);
        // Handle the error here
      });
  }

  changePage(event: any) {
    this.pageSize = event.pageSize;
    this.page = event.pageIndex;
    this.paginatedPatients = this.patients.slice(
      this.page * this.pageSize,
      (this.page + 1) * this.pageSize
    );
  }

  openChart(patient: Patient): void {
    const dialogPosition: DialogPosition = {
      top: '10%',
      left: '10%'
    };

    this.dialog.open(ChartComponent, {
      width: '80vw',
      disableClose: true, // Prevent clicking outside the dialog
      data: patient,
      position: dialogPosition
    });

  }
}