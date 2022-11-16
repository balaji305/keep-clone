import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Note } from './note';
import { NoteService } from './note.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  sideNavStatus!: boolean;
  noteBoxStatus!: boolean;
  mobile!: boolean;
  id!: number;
  user!: string;
  userInput!: string;
  newNoteForm!: FormGroup;
  tempNote!: Note;
  noteList!: Note[];
  pinnedNoteList!: Note[];
  normalNoteList!: Note[];

  constructor(
    private formBuilder: FormBuilder,
    private noteService: NoteService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (window.screen.width <= 400) {
      this.mobile = true;
    }
    if (!localStorage.getItem('userName')) {
      this.router.navigate(['/login']);
    }
    this.newNoteForm = this.formBuilder.group({
      title: ['', Validators.required],
      body: ['', Validators.required],
    });
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

  autogrow() {
    let textArea = document.getElementById('txtarea') as HTMLElement;
    textArea.style.overflow = 'hidden';
    textArea.style.height = '0px';
    textArea.style.height = textArea.scrollHeight + 'px';
  }

  addNote() {
    const title = this.newNoteForm.controls['title'].value;
    const body = this.newNoteForm.controls['body'].value;
    if (this.noteList) {
      let temp = 1;
      let flag = true;
      this.noteList.forEach((note) => {
        if (flag) {
          if (note.id === temp) temp = temp + 1;
          else {
            this.id = temp;
            flag = false;
          }
        }
      });
      if (temp === this.noteList.length + 1) this.id = temp;
    } else this.id = 1;

    this.noteService
      .addNote({
        user: this.user,
        title: title,
        body: body,
        id: this.id,
        isArchived: false,
        isPinned: false,
        isDeleted: false,
      })
      .subscribe({
        next: () => {
          this.getNotes();
        },
      });
    this.clearNote();
  }
  clearNote() {
    this.newNoteForm.reset();
  }

  getNotes() {
    this.user = localStorage.getItem('userName') || '';
    this.noteService.getAllNotes().subscribe((curNote) => {
      this.noteList = curNote;
      this.noteList.sort((first, second) =>
        first.id < second.id ? -1 : first.id > second.id ? 1 : 0
      );
    });
    this.noteService.getNormalNotes().subscribe((curNote) => {
      this.normalNoteList = curNote;
    });
    this.noteService.getPinnedNotes().subscribe((curNote) => {
      this.pinnedNoteList = curNote;
    });
  }

  deleteNote(id: number) {
    this.noteList.forEach((note) => {
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

  pinNote(id: number) {
    this.noteList.forEach((note) => {
      if (note.id === id) {
        this.tempNote = note;
      }
    });
    this.noteService.pinNote(this.tempNote).subscribe({
      next: () => {
        this.getNotes();
      },
      error: (err) => console.log(err),
    });
  }

  archiveNote(id: number) {
    this.noteList.forEach((note) => {
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
}
