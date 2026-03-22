import { Component } from '@angular/core';

// TODO: Import signal, computed from '@angular/core'
// TODO: Import toSignal, toObservable from '@angular/core/rxjs-interop'
// TODO: Import filter, distinctUntilChanged, switchMap, map from 'rxjs/operators'
// TODO: Import of from 'rxjs'

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

  // TODO: Declare query = signal('')
  // TODO: Create debouncedQuery via toObservable(query).pipe(filter(q => q.length >= 2), distinctUntilChanged())
  // TODO: Create searchTerm = toSignal(debouncedQuery, { initialValue: '' })
  // TODO: Create results via toSignal of debouncedQuery.pipe(switchMap(q => of(allItems.filter(...))), { initialValue: [] })
  // TODO: Create resultCount = computed(() => results().length)
}
