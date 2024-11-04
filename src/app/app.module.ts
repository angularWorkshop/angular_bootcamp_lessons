import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';
import { AppComponent } from './app.component';
import { ProductListComponent } from './product-list/product-list.component';

@NgModule({
  imports: [CommonModule, RouterOutlet, BrowserModule],
  declarations: [AppComponent, ProductListComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
