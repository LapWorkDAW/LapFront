import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { User } from "src/assets/models/User";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class UserService {
  constructor(private http: HttpClient) { }


  update(date: FormData, token: String) {
    let url = "/api.php?controller=User&function=photo&token=" + token;
    return this.http.post(
      url, date, { headers: new HttpHeaders({ 'enctype': 'multipart/form-data' }) }
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
    return this.http.post(url, user, {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    });
  }
  getAllUsers(fn: Function) {
    let url =
      "http://localhost/LapBack/api.php?controller=User&function=getactiv";
    fetch(url)
      .then(resp => resp.json())
      .then(resp => {
        fn(resp.data);
      });
  }

  checkCurrentPassword(password: String, token: string) {
    let url = "/api.php?controller=User&function=getbymail&id=";
    return this.http.get(
      url, { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
    );
  }
}
