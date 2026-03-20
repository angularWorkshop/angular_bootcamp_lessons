import { Component } from '@angular/core';

@Component({
  selector: 'app-legacy-avatar',
  template: `
    <div class="avatar" data-testid="avatar">
      <span class="avatar__initials">LM</span>
    </div>
  `,
  styles: [
    `
      .avatar {
        display: inline-grid;
        place-items: center;
        width: 72px;
        height: 72px;
        border-radius: 50%;
        background: #d97706;
        color: white;
        font-weight: 700;
        letter-spacing: 0.08em;
      }
    `,
  ],
})
export class LegacyAvatarComponent {}
