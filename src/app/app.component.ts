import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TableStateFacadeService } from './table-state/table-state-facade.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  protected readonly title = 'Query-Driven Orders Table';

  public constructor(
    protected readonly facade: TableStateFacadeService,
    _router: Router,
    _route: ActivatedRoute,
  ) {}

  public ngOnInit(): void {
    this.facade.connectRoute();
  }
}
