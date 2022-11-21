import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, isDevMode } from '@angular/core';
import { Observable } from 'rxjs';
import { Note } from './note';

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  backendUrl: string;

  constructor(private http: HttpClient) {
    if (isDevMode()) {
      this.backendUrl = 'http://localhost:5000/api/notes';
    } else {
      this.backendUrl = '/api/notes';
    }
  }

  getAllNotes(): Observable<Note[]> {
    return this.http.get<Note[]>(this.backendUrl + '/getallnotes');
  }

  getNormalNotes(): Observable<Note[]> {
    const queryParams = new HttpParams({
      fromObject: { userName: localStorage.getItem('userName') || '' },
    });

    return this.http.get<Note[]>(this.backendUrl + '/getnormalnotes', {
      params: queryParams,
    });
  }

  getPinnedNotes(): Observable<Note[]> {
    const queryParams = new HttpParams({
      fromObject: { userName: localStorage.getItem('userName') || '' },
    });

    return this.http.get<Note[]>(this.backendUrl + '/getpinnednotes', {
      params: queryParams,
    });
  }

  getArchivedNotes(): Observable<Note[]> {
    const queryParams = new HttpParams({
      fromObject: { userName: localStorage.getItem('userName') || '' },
    });

    return this.http.get<Note[]>(this.backendUrl + '/getarchivednotes', {
      params: queryParams,
    });
  }

  getDeletedNotes(): Observable<Note[]> {
    const queryParams = new HttpParams({
      fromObject: { userName: localStorage.getItem('userName') || '' },
    });

    return this.http.get<Note[]>(this.backendUrl + '/getdeletednotes', {
      params: queryParams,
    });
  }

  addNote(note: Note): Observable<Note> {
    const options = new HttpHeaders({ 'content-Type': 'application/json' });
    return this.http.post<Note>(this.backendUrl + '/addnote', note, {
      headers: options,
    });
  }

  deleteNote(id: number): Observable<Note[]> {
    return this.http.delete<Note[]>(this.backendUrl + '/deletenote/' + id);
  }

  tempDeleteNote(unote: any): Observable<Note[]> {
    unote.isDeleted = !unote.isDeleted;
    const options = new HttpHeaders({ 'content-type': 'application/json' });
    return this.http
      .put<any>(this.backendUrl + `/updatenote/${unote.id}`, unote, {
        headers: options,
      })
      .pipe();
  }

  pinNote(unote: any): Observable<Note[]> {
    unote.isPinned = !unote.isPinned;
    const options = new HttpHeaders({ 'content-type': 'application/json' });
    return this.http
      .put<any>(this.backendUrl + `/updatenote/${unote.id}`, unote, {
        headers: options,
      })
      .pipe();
  }

  archiveNote(unote: any): Observable<Note[]> {
    unote.isArchived = !unote.isArchived;
    const options = new HttpHeaders({ 'content-type': 'application/json' });
    return this.http
      .put<any>(this.backendUrl + `/updatenote/${unote.id}`, unote, {
        headers: options,
      })
      .pipe();
  }
}
