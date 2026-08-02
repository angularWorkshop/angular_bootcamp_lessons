import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';
import { AppComponent } from './app.component';
import { errorRetryInterceptor } from './error-retry.interceptor';


@NgModule({
  imports: [
    CommonModule,
    RouterOutlet,
    BrowserModule,
    AppComponent
  ],
  declarations: [],
  providers: [provideHttpClient(withInterceptors([errorRetryInterceptor]))],
  bootstrap:  [AppComponent]
})
export class AppModule { }
