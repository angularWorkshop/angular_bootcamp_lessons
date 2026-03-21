import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  protected readonly title = 'Curriculum Map Designer';
  protected readonly curriculumForm = this.formBuilder.nonNullable.group({
    programName: ['Angular Accelerator'],
    modules: this.formBuilder.array([this.createModule('Reactive Foundations', ['Signals vs streams'])]),
  });

  constructor(private readonly formBuilder: FormBuilder) {}

  protected get modules(): FormArray {
    return this.curriculumForm.controls.modules;
  }

  protected lessonsAt(moduleIndex: number): FormArray {
    return (this.modules.at(moduleIndex) as FormGroup).get('lessons') as FormArray;
  }

  protected moduleTitleAt(moduleIndex: number): string {
    return ((this.modules.at(moduleIndex) as FormGroup).get('moduleTitle')?.value as string | null) || 'Awaiting module title';
  }

  protected addModule(): void {
    this.modules.push(this.createModule('', ['']));
  }

  protected addLesson(moduleIndex: number): void {
    this.lessonsAt(moduleIndex).push(this.formBuilder.nonNullable.control(''));
  }

  private createModule(moduleTitle: string, lessons: string[]): FormGroup {
    return this.formBuilder.nonNullable.group({
      moduleTitle: [moduleTitle],
      lessons: this.formBuilder.nonNullable.array(lessons),
    });
  }
}
