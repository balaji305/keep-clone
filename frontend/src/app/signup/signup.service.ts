import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, isDevMode } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SignupService {
  backendUrl: string;

  constructor(private http: HttpClient) {
    if (isDevMode()) {
      this.backendUrl = 'http://localhost:5000/api/auth';
    } else {
      this.backendUrl = '/api/auth';
    }
  }

  signUp(user: any): Observable<any> {
    const options = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.backendUrl + '/signUp', user, {
      headers: options,
    });
  }
}
