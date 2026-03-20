import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';
import { AppComponent } from './app.component';
import { CourseOverviewCardComponent } from './course-overview-card/course-overview-card.component';
import { PracticeStatusCardComponent } from './practice-status-card/practice-status-card.component';


@NgModule({
  imports: [
    CommonModule,
    RouterOutlet,
    BrowserModule,
    CourseOverviewCardComponent,
    PracticeStatusCardComponent,
  ],
  declarations: [AppComponent],
  bootstrap:  [AppComponent]
})
export class AppModule { }
