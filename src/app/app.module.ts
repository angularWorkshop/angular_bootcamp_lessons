import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { LearningPlanCardComponent } from './learning-plan-card/learning-plan-card.component';
import { PracticeReminderCardComponent } from './practice-reminder-card/practice-reminder-card.component';

@NgModule({
  imports: [BrowserModule, LearningPlanCardComponent, PracticeReminderCardComponent],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
