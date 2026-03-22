import { Component, signal, computed } from '@angular/core';
import { toSignal, toObservable } from '@angular/core/rxjs-interop';
import { filter, distinctUntilChanged, switchMap, map } from 'rxjs/operators';
import { of, pipe } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  protected readonly allItems = [
    { id: 1, name: 'Angular' },
    { id: 2, name: 'React' },
    { id: 3, name: 'Vue' },
    { id: 4, name: 'Svelte' },
    { id: 5, name: 'Solid' },
    { id: 6, name: 'Ember' },
    { id: 7, name: 'Backbone' },
  ];

  protected readonly query = signal('');

  private readonly searchPipe = pipe(
    filter((q: string) => q.length >= 2),
    distinctUntilChanged(),
    map((q: string) => q.toLowerCase()),
  );

  private readonly query$ = toObservable(this.query);

  private readonly debouncedQuery$ = this.query$.pipe(this.searchPipe);

  protected readonly searchTerm = toSignal(this.debouncedQuery$, { initialValue: '' });

  protected readonly results = toSignal(
    this.query$.pipe(
      map((q: string) => q.toLowerCase()),
      distinctUntilChanged(),
      switchMap(q =>
        q.length >= 2
          ? of(this.allItems.filter(item => item.name.toLowerCase().includes(q)))
          : of([] as { id: number; name: string }[]),
      ),
    ),
    { initialValue: [] as { id: number; name: string }[] },
  );

  protected readonly resultCount = computed(() => this.results().length);
}
