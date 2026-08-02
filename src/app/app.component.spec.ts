import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { FeedStreamService } from './feed/feed-stream.service';
import { FeedFacadeService } from './feed/feed-facade.service';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let host: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [FeedStreamService, FeedFacadeService],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    host = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
  });

  it('should append a new event to the feed', () => {
    click('push-event');
    expect(query('feed-event-New comment from Mia')).toBeTruthy();
  });

  it('should move the connection status into reconnecting and back to connected', () => {
    click('disconnect');
    expect(getText('connection-status')).toBe('reconnecting');
    click('reconnect');
    expect(getText('connection-status')).toBe('connected');
  });

  function click(testId: string): void {
    const element = query(testId) as HTMLButtonElement | null;
    expect(element).toBeTruthy();
    element?.click();
    fixture.detectChanges();
  }

  function getText(testId: string): string {
    const element = query(testId);
    expect(element).toBeTruthy();
    return element?.textContent?.trim() ?? '';
  }

  function query(testId: string): HTMLElement | null {
    return host.querySelector(`[data-testid="${testId}"]`);
  }
});
