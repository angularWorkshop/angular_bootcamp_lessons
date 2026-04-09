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

  it('should start from the placeholder path', () => {
    expect(query('secondary-placeholder')).toBeTruthy();
    expect(getText('budget-status')).toBe('primary-only');
  });

  it('should reveal the secondary panel after the user request', () => {
    click('show-secondary');
    fixture.detectChanges();
    expect(getText('budget-status')).toBe('extended');
  });

  it('should contain a real @defer block in the template', () => {
    const templatePath = path.join('D:/Workspace/workshop/angular_bootcamp_lessons', 'src/app/app.component.html');
    const template = fs.readFileSync(templatePath, 'utf8');
    expect(template).toContain('@defer');
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
