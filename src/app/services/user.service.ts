import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from 'src/assets/models/User';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getById(id: number) {
    /* return this.http.get(`${config.apiUrl}/users/${id}`); */
  }

  update(user: User) {
    /* return this.http.put(`${config.apiUrl}/users/${user.id}`, user); */
  }

  delete(id: number) {
    /* return this.http.delete(`${config.apiUrl}/users/${id}`); */
  }

  register(user: User): Observable<any> {
    let url = "";
    return this.http.post(
      url, user, { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
    );
  }

  getAllUsers(fn: Function) {
    let url = "api.php?controller=Users&function=getactiv";
    fetch(url)
      .then(resp => resp.json())
      .then(resp => {
        fn(resp.data);
      })
  }

}
