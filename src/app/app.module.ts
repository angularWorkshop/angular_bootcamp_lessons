import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { LegacyProfileModule } from './legacy-profile.module';

@NgModule({
  imports: [BrowserModule, CommonModule, LegacyProfileModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
