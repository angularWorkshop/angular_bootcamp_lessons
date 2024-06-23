import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';
import { AppComponent } from './app.component';
import { HelloWorldComponent } from './components/hello-word/hello-word.component';

@NgModule({
  imports: [CommonModule, RouterOutlet, BrowserModule],
  declarations: [AppComponent, HelloWorldComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
