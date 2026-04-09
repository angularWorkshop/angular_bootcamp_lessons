import { Component, OnInit } from '@angular/core';
import { FeedStreamService } from './feed/feed-stream.service';
import { FeedFacadeService } from './feed/feed-facade.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  public constructor(
    protected readonly facade: FeedFacadeService,
    protected readonly stream: FeedStreamService,
  ) {}

  public ngOnInit(): void {
    this.facade.connect();
  }
}
