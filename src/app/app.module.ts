import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';
import { AppComponent } from './app.component';


@NgModule({
  imports: [
    CommonModule,
    RouterOutlet,
    BrowserModule
  ],
  providers: [provideClientHydration()],
  declarations: [AppComponent],
  bootstrap:  [AppComponent]
})
export class AppModule { }
