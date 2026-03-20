import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, DashboardComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
