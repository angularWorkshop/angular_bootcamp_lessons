import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';
import { LegacyAvatarComponent } from './legacy-avatar.component';
import { LegacyProfileComponent } from './legacy-profile.component';
import { LegacyProfileModule } from './legacy-profile.module';

describe('AppComponent – legacy module analysis', () => {
  let fixture: ComponentFixture<AppComponent>;
  let host: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent, LegacyProfileComponent, LegacyAvatarComponent],
      imports: [CommonModule, FormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    host = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
  });

  it('should create the app component', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the heading', () => {
    expect(host.querySelector('h1')?.textContent?.trim()).toBe('Legacy Module Analysis');
  });

  it('should render the legacy profile card', () => {
    expect(host.querySelector('[data-testid="profile-card"]')).toBeTruthy();
    expect(host.querySelector('[data-testid="profile-name"]')?.textContent?.trim()).toBe('Legacy Max');
  });

  it('should update the display name through ngModel', () => {
    const input = host.querySelector('[data-testid="name-input"]') as HTMLInputElement;

    input.value = 'Refactored Nina';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(host.querySelector('[data-testid="profile-name"]')?.textContent?.trim()).toBe('Refactored Nina');
  });

  it('should render all legacy tags', () => {
    const tags = host.querySelectorAll('[data-testid="tag-list"] li');

    expect(tags).toHaveLength(3);
    expect(Array.from(tags).map((tag) => tag.textContent?.trim())).toEqual([
      'admin-panel',
      'forms',
      'migration',
    ]);
  });

  it('should declare the legacy feature components in LegacyProfileModule', () => {
    const declarations = getNgModuleMetadata(LegacyProfileModule).declarations;

    expect(declarations).toEqual(expect.arrayContaining([LegacyProfileComponent, LegacyAvatarComponent]));
  });

  it('should import CommonModule and FormsModule in LegacyProfileModule', () => {
    const imports = getNgModuleMetadata(LegacyProfileModule).imports;

    expect(imports).toEqual(expect.arrayContaining([CommonModule, FormsModule]));
  });

  it('should export LegacyProfileComponent from LegacyProfileModule', () => {
    const exportsList = getNgModuleMetadata(LegacyProfileModule).exports;

    expect(exportsList).toContain(LegacyProfileComponent);
  });

  it('should import LegacyProfileModule in AppModule', () => {
    const imports = getNgModuleMetadata(AppModule).imports;

    expect(imports).toContain(LegacyProfileModule);
  });

  it('should stop declaring legacy feature components in AppModule', () => {
    const declarations = getNgModuleMetadata(AppModule).declarations;

    expect(declarations).not.toContain(LegacyProfileComponent);
    expect(declarations).not.toContain(LegacyAvatarComponent);
  });
});

function getNgModuleMetadata(moduleType: unknown): {
  declarations: unknown[];
  imports: unknown[];
  exports: unknown[];
} {
  const definition = (moduleType as { ɵmod?: { declarations?: unknown[]; imports?: unknown[]; exports?: unknown[] } }).ɵmod;

  return {
    declarations: definition?.declarations ?? [],
    imports: definition?.imports ?? [],
    exports: definition?.exports ?? [],
  };
}
