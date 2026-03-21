import { Component } from '@angular/core';

type ReleaseState = 'ready' | 'watch' | 'blocked';

interface ReleaseCard {
  name: string;
  owner: string;
  state: ReleaseState;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  protected filter: ReleaseState | 'all' = 'all';
  protected query = '';

  protected readonly cards: ReleaseCard[] = [
    { name: 'Checkout polish', owner: 'Mia', state: 'ready' },
    { name: 'Invoice rollback', owner: 'Alex', state: 'watch' },
    { name: 'Access audit', owner: 'Nina', state: 'blocked' },
  ];

  protected setFilter(filter: ReleaseState | 'all'): void {
    this.filter = filter;
  }

  protected setQuery(query: string): void {
    this.query = query.trim().toLowerCase();
  }

  protected isActive(filter: ReleaseState | 'all'): boolean {
    return this.filter === filter;
  }

  protected get visibleCards(): ReleaseCard[] {
    return this.cards.filter((card) => {
      const matchesFilter = this.filter === 'all' || card.state === this.filter;
      const matchesQuery =
        this.query.length === 0 ||
        card.name.toLowerCase().includes(this.query) ||
        card.owner.toLowerCase().includes(this.query);

      return matchesFilter && matchesQuery;
    });
  }
}
