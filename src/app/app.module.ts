import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';
import { AppCardComponent } from './app-card.component';
import { AppComponent } from './app.component';


@NgModule({
  imports: [
    CommonModule,
    AppCardComponent,
    RouterOutlet,
    BrowserModule
  ],
  declarations: [AppComponent],
  bootstrap:  [AppComponent]
})
export class AppModule { }
