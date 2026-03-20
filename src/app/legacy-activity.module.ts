import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LegacyActivityWidgetComponent } from './legacy-activity-widget.component';

@NgModule({
  declarations: [LegacyActivityWidgetComponent],
  imports: [CommonModule],
  exports: [LegacyActivityWidgetComponent],
})
export class LegacyActivityModule {}
