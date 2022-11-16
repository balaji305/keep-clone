import { Component, OnInit } from '@angular/core';
import { NoteService } from '../dashboard/note.service';
import { Note } from '../dashboard/note';
import { Router } from '@angular/router';

@Component({
  selector: 'app-deleted-note',
  templateUrl: './deleted-note.component.html',
  styleUrls: ['./deleted-note.component.css'],
})
export class DeletedNoteComponent implements OnInit {
  sideNavStatus!: boolean;
  noteBoxStatus!: boolean;
  mobile!: boolean;
  user!: string;
  tempNote!: Note;
  deletededNoteList!: Note[];

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
    this.noteService.getDeletedNotes().subscribe((curNote) => {
      this.deletededNoteList = curNote;
    });
  }

  deleteNote(id: number) {
    this.noteService.deleteNote(id).subscribe({
      next: () => {
        this.getNotes();
      },
      error: (err) => console.log(err),
    });
  }

  restoreNote(id: number) {
    this.deletededNoteList.forEach((note) => {
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
