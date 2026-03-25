import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HeavyTableComponent } from './heavy-table.component';

@NgModule({
  declarations: [AppComponent, HeavyTableComponent],
  imports: [CommonModule, BrowserModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
