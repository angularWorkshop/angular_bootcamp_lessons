import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DeepLinkFacadeService } from './deep-link/deep-link-facade.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  protected readonly title = 'Deep-Link Details Screen';

  public constructor(
    protected readonly facade: DeepLinkFacadeService,
    _router: Router,
    _route: ActivatedRoute,
  ) {}

  public ngOnInit(): void {
    this.facade.connectRoute();
  }
}
