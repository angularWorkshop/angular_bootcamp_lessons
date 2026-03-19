import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { LessonPreviewCardComponent } from './lesson-preview-card/lesson-preview-card.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, LessonPreviewCardComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
