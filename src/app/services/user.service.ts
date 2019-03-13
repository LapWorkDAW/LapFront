import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from 'src/assets/models/User';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  update(user: User, token: String) {
    let url = "/api.php?controller=User&token=" + token;
    return this.http.put(
      url, user, { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
    );
  }

  delete(token: String) {
    let url = "/api.php?controller=User&token=" + token;
    return this.http.delete(
      url, { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
    );
  }

  register(user: User): Observable<any> {
    let url = "/api.php?controller=User";
    return this.http.post(
      url, user, { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
    );
  }
}
