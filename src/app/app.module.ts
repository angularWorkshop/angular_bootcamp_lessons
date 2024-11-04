import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';
import { AppComponent } from './app.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, RouterOutlet, BrowserModule, FormsModule],
  declarations: [AppComponent, UserInfoComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
