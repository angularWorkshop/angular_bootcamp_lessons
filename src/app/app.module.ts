import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';
import { AppComponent } from './app.component';
import { ReactiveFormComponent } from './reactive-form/reactive-form.component';


@NgModule({
  imports: [
    CommonModule,
    RouterOutlet,
    BrowserModule
  ],
  declarations: [	AppComponent,
      ReactiveFormComponent
   ],
  bootstrap:  [AppComponent]
})
export class AppModule { }
