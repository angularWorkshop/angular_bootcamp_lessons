import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AppComponent } from './app.component';

@NgModule({
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    BrowserModule,
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
