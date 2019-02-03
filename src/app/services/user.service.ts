import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from 'src/assets/models/User';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  postUser(user: User): Observable<any> {
    let url = "";
    return this.http.post(
      url, user, { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
    );
  }
}
