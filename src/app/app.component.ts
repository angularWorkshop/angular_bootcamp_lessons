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
    // TODO: add a new speaker control to the FormArray
  }

  protected removeSpeaker(index: number): void {
    // TODO: remove the selected speaker control from the FormArray
  }
}
