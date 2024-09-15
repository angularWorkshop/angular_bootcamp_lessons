import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';
import { AppComponent } from './app.component';
import { RegistrationComponent } from './registration/registration.component';


@NgModule({
  imports: [
    CommonModule,
    RouterOutlet,
    BrowserModule,
    RegistrationComponent
  ],
  declarations: [AppComponent],
  bootstrap:  [AppComponent]
})
export class AppModule { }
