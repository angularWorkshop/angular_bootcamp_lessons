import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ProductModule } from './product/product.module';

@NgModule({
  imports: [CommonModule, AppRoutingModule, RouterOutlet, BrowserModule, FormsModule, ProductModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
