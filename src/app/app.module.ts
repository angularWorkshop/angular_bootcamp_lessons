import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { NoteListComponent } from './note-list.component';
import { ContactListComponent } from './contact-list.component';

// TODO: After reorganizing into feature-based structure,
// update imports below to point to the new file locations.

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    NoteListComponent,
    ContactListComponent,
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
