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
  noteBoxStatus!: boolean;
  sideNavStatus!: boolean;
  mobile!: boolean;
  user!: string;
  tempNote!: Note;
  archivedNoteList!: Note[];

  constructor(private noteService: NoteService, private router: Router) {}

  ngOnInit(): void {
    if (window.screen.width <= 400) {
      this.mobile = true;
    }
    if (localStorage.getItem('userName') === '') {
      this.router.navigate(['/login']);
    }
    this.getNotes();
  }

  onHover() {
    this.sideNavStatus = !this.sideNavStatus;
    if (this.noteBoxStatus)
      setTimeout(() => {
        this.noteBoxStatus = !this.noteBoxStatus;
      }, 250);
    else this.noteBoxStatus = !this.noteBoxStatus;
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
