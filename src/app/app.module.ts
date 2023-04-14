import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ChartComponent } from './chart/chart.component';

import { HighchartsChartModule } from 'highcharts-angular';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [AppComponent, ChartComponent],
  imports: [BrowserModule, HighchartsChartModule, MatDialogModule],
  bootstrap: [AppComponent]
})
export class AppModule {}
