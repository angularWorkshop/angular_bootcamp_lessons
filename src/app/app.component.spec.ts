import fs from 'node:fs';
import path from 'node:path';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let host: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ declarations: [AppComponent] }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    host = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
  });

  it('should render the shared project status model', () => {
    expect(getText('status-name')).toBe('Operations dashboard');
    expect(getText('status-value')).toBe('healthy');
  });

  it('should keep shared presenters free from feature imports', () => {
    const presenterPath = path.join('D:/Workspace/workshop/angular_bootcamp_lessons', 'src/app/shared/presenters/project-status.presenter.ts');
    const presenter = fs.readFileSync(presenterPath, 'utf8');
    expect(presenter).not.toContain('orders-facade.service');
    expect(presenter).toContain('ProjectStatusVm');
  });

  it('should keep core overview files dependent on shared contracts only', () => {
    const overviewPath = path.join('D:/Workspace/workshop/angular_bootcamp_lessons', 'src/app/core/project-overview.ts');
    const overview = fs.readFileSync(overviewPath, 'utf8');
    expect(overview).not.toContain('orders-facade.service');
    expect(overview).toContain('ProjectStatusVm');
  });

  function getText(testId: string): string {
    const element = host.querySelector(`[data-testid="${testId}"]`);
    expect(element).toBeTruthy();
    return element?.textContent?.trim() ?? '';
  }
});
