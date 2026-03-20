import { Component } from '@angular/core';

@Component({
  selector: 'app-legacy-profile',
  template: `
    <section class="profile-card" data-testid="profile-card">
      <app-legacy-avatar></app-legacy-avatar>

      <div class="profile-card__content">
        <p class="profile-card__eyebrow">Legacy profile widget</p>
        <h2 class="profile-card__title" data-testid="profile-name">{{ displayName }}</h2>

        <label class="profile-card__label" for="displayName">Display name</label>
        <input
          id="displayName"
          name="displayName"
          data-testid="name-input"
          [(ngModel)]="displayName"
        />

        <ul class="profile-card__tags" data-testid="tag-list">
          <li *ngFor="let tag of tags">{{ tag }}</li>
        </ul>
      </div>
    </section>
  `,
  styles: [
    `
      .profile-card {
        display: grid;
        grid-template-columns: auto 1fr;
        gap: 20px;
        align-items: start;
        padding: 24px;
        border-radius: 20px;
        background: white;
        box-shadow: 0 18px 40px rgba(15, 23, 42, 0.08);
      }

      .profile-card__content {
        display: grid;
        gap: 12px;
      }

      .profile-card__eyebrow {
        margin: 0;
        color: #92400e;
        font-size: 12px;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.08em;
      }

      .profile-card__title {
        margin: 0;
        font-size: 28px;
      }

      .profile-card__label {
        font-size: 14px;
        font-weight: 600;
      }

      .profile-card__tags {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        margin: 0;
        padding: 0;
        list-style: none;
      }

      .profile-card__tags li {
        padding: 6px 10px;
        border-radius: 999px;
        background: #fef3c7;
        color: #92400e;
        font-size: 14px;
      }
    `,
  ],
})
export class LegacyProfileComponent {
  displayName = 'Legacy Max';
  tags = ['admin-panel', 'forms', 'migration'];
}
