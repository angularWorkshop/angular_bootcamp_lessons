import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AccessPageComponent } from './access/access-page.component';
import { AppComponent } from './app.component';
import { routes } from './app.routes';
import { TaskFormPageComponent } from './tasks/task-form-page.component';
import { TaskListPageComponent } from './tasks/task-list-page.component';

@NgModule({
  imports: [CommonModule, BrowserModule, ReactiveFormsModule, RouterModule.forRoot(routes)],
  declarations: [AppComponent, AccessPageComponent, TaskListPageComponent, TaskFormPageComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
