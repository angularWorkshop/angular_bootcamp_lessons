import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';
import { AppComponent } from './app.component';
import { authInterceptor } from './auth.interceptor';


@NgModule({
  imports: [
    CommonModule,
    RouterOutlet,
    BrowserModule,
    AppComponent
  ],
  declarations: [],
  providers: [provideHttpClient(withInterceptors([authInterceptor]))],
  bootstrap:  [AppComponent]
})
export class AppModule { }
