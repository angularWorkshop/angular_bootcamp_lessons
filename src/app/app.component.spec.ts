import fs from 'node:fs';
import path from 'node:path';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { WorkspaceBadgeComponent } from './shared/workspace-badge/workspace-badge.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let host: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent, WorkspaceBadgeComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    host = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
  });

  it('should render the shared badge data', () => {
    expect(query('workspace-badge')?.textContent).toContain('Core migrations');
    expect(getText('workspace-badge-count')).toBe('4');
  });

  it('should export the shared component and model through public-api.ts', () => {
    const publicApiPath = path.join('D:/Workspace/workshop/angular_bootcamp_lessons', 'src/app/shared/public-api.ts');
    const publicApiText = fs.readFileSync(publicApiPath, 'utf8');
    expect(publicApiText).toContain('workspace-badge.component');
    expect(publicApiText).toContain('workspace-badge.models');
  });

  it('should make feature hosts import the shared badge only through the public API', () => {
    const catalogHostPath = path.join('D:/Workspace/workshop/angular_bootcamp_lessons', 'src/app/features/catalog/catalog-badge-host.ts');
    const reportsHostPath = path.join('D:/Workspace/workshop/angular_bootcamp_lessons', 'src/app/features/reports/reports-badge-host.ts');
    const catalogHost = fs.readFileSync(catalogHostPath, 'utf8');
    const reportsHost = fs.readFileSync(reportsHostPath, 'utf8');
    expect(catalogHost).toContain('../../shared/public-api');
    expect(reportsHost).toContain('../../shared/public-api');
    expect(catalogHost).not.toContain('workspace-badge/workspace-badge.component');
    expect(reportsHost).not.toContain('workspace-badge/workspace-badge.component');
  });

  function getText(testId: string): string {
    const element = query(testId);
    expect(element).toBeTruthy();
    return element?.textContent?.trim() ?? '';
  }

  function query(testId: string): HTMLElement | null {
    return host.querySelector(`[data-testid="${testId}"]`);
  }
});
