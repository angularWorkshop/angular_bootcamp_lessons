import { CommonModule } from '@angular/common';
import { AfterContentInit, Component, ContentChildren, QueryList } from '@angular/core';
import { TabComponent } from './tab.component';

@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [CommonModule],
  template: `
    <nav class="tabs-nav">
      <button
        type="button"
        *ngFor="let tab of tabsArray; let index = index"
        [attr.data-testid]="'tab-btn-' + index"
        [class.active]="index === activeIndex"
        (click)="selectTab(index)">
        {{ tab.title }}
      </button>
    </nav>
    <ng-content></ng-content>
  `,
  styles: [
    `
      .tabs-nav {
        display: flex;
        gap: 0.5rem;
        margin-bottom: 0.75rem;
      }
      .tabs-nav button {
        border: 1px solid #cbd5e1;
        background: #ffffff;
        border-radius: 8px;
        padding: 0.45rem 0.7rem;
        cursor: pointer;
      }
      .tabs-nav button.active {
        background: #2563eb;
        color: #ffffff;
        border-color: #2563eb;
      }
    `,
  ],
})
export class TabsComponent implements AfterContentInit {
  @ContentChildren(TabComponent) private tabs!: QueryList<TabComponent>;

  protected activeIndex = 0;

  protected get tabsArray(): TabComponent[] {
    return this.tabs?.toArray() ?? [];
  }

  ngAfterContentInit(): void {
    // TODO: set default active tab and keep projected tabs synchronized.
  }

  protected selectTab(index: number): void {
    this.activeIndex = index;
    // TODO: activate selected tab and deactivate others.
  }
}
