import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';
import { AppComponent } from './app.component';
import { TabComponent } from './tab.component';
import { TabsComponent } from './tabs.component';


@NgModule({
  imports: [
    CommonModule,
    TabsComponent,
    TabComponent,
    RouterOutlet,
    BrowserModule
  ],
  declarations: [AppComponent],
  bootstrap:  [AppComponent]
})
export class AppModule { }
