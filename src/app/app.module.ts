import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { NoteListComponent } from './features/notes/note-list.component';
import { ContactListComponent } from './features/contacts/contact-list.component';

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
