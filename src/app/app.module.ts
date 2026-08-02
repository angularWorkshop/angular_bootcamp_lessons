import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';
import { AppComponent } from './app.component';
import { SearchBoxComponent } from './search-box.component';


@NgModule({
  imports: [
    CommonModule,
    RouterOutlet,
    BrowserModule,
    SearchBoxComponent,
    AppComponent
  ],
  declarations: [],
  bootstrap:  [AppComponent]
})
export class AppModule { }
