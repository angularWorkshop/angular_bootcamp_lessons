import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';
import { AppComponent } from './app.component';
import { HasRoleDirective } from './has-role.directive';


@NgModule({
  imports: [
    CommonModule,
    HasRoleDirective,
    RouterOutlet,
    BrowserModule
  ],
  declarations: [AppComponent],
  bootstrap:  [AppComponent]
})
export class AppModule { }
