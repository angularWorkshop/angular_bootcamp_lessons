import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LegacyAvatarComponent } from './legacy-avatar.component';
import { LegacyProfileComponent } from './legacy-profile.component';

@NgModule({
  declarations: [LegacyProfileComponent, LegacyAvatarComponent],
  imports: [CommonModule, FormsModule],
  exports: [LegacyProfileComponent],
})
export class LegacyProfileModule {}
