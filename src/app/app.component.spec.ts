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

  it('should filter the rows through the computed state', () => {
    click('show-live');
    fixture.detectChanges();
    expect(queryAll('task-row').length).toBe(2);
  });

  it('should use a stable track expression in the template', () => {
    const templatePath = path.join('D:/Workspace/workshop/angular_bootcamp_lessons', 'src/app/app.component.html');
    const template = fs.readFileSync(templatePath, 'utf8');
    expect(template).toContain('track row.id');
  });

  function click(testId: string): void {
    const element = host.querySelector(`[data-testid="${testId}"]`) as HTMLButtonElement | null;
    expect(element).toBeTruthy();
    element?.click();
    fixture.detectChanges();
  }

  function queryAll(testId: string): HTMLElement[] {
    return Array.from(host.querySelectorAll(`[data-testid="${testId}"]`));
  }
});
