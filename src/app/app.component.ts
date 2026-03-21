import { Component } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  protected readonly title = 'Speaker Roster Builder';
  protected readonly rosterForm = this.formBuilder.nonNullable.group({
    eventName: ['Frontend Summit'],
    speakers: this.formBuilder.nonNullable.array(['Keynote host']),
  });

  constructor(private readonly formBuilder: FormBuilder) {}

  protected get speakers(): FormArray {
    return this.rosterForm.controls.speakers;
  }

  protected addSpeaker(): void {
    this.speakers.push(this.formBuilder.nonNullable.control(''));
  }

  protected removeSpeaker(index: number): void {
    this.speakers.removeAt(index);
  }
}
