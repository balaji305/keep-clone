import { Component, OnInit } from '@angular/core';
import { NoteService } from '../dashboard/note.service';
import { Note } from '../dashboard/note';
import { Router } from '@angular/router';
@Component({
  selector: 'app-archived-note',
  templateUrl: './archived-note.component.html',
  styleUrls: ['./archived-note.component.css'],
})
export class ArchivedNoteComponent implements OnInit {
  sideNavStatus!: boolean;
  archivedNoteList!: Note[];
  tempNote!: Note;
  user!: string;
  constructor(private noteService: NoteService, private router: Router) {}

  ngOnInit(): void {
    if (localStorage.getItem('userName') === '') {
      this.router.navigate(['/login']);
    }
    this.getNotes();
  }

  onHover() {
    this.sideNavStatus = !this.sideNavStatus;
  }
  getNotes() {
    this.noteService.getArchivedNotes().subscribe((curNote) => {
      this.archivedNoteList = curNote;
    });
  }
  archiveNote(id: number) {
    this.archivedNoteList.forEach((note) => {
      if (note.id === id) {
        this.tempNote = note;
      }
    });
    this.noteService.archiveNote(this.tempNote).subscribe({
      next: () => {
        this.getNotes();
      },
      error: (err) => console.log(err),
    });
  }
  deleteNote(id: number) {
    this.archivedNoteList.forEach((note) => {
      if (note.id === id) {
        this.tempNote = note;
      }
    });
    this.noteService.tempDeleteNote(this.tempNote).subscribe({
      next: () => {
        this.getNotes();
      },
      error: (err) => console.log(err),
    });
  }
}
