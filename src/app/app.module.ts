import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { routes } from './app.routes';
import { DetailsPageComponent } from './details-page.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
    BrowserModule,
    AppComponent
  ],
  declarations: [
    DetailsPageComponent
  ],
  bootstrap:  [AppComponent]
})
export class AppModule { }
