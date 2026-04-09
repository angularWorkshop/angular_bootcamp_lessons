import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';


@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
  ],
  declarations: [
    AppComponent,
    WorkspaceBadgeComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
