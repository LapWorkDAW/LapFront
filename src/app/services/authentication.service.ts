import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, config } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from 'src/assets/models/User';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(username: string, password, token) {
        let json = { "username": username, "pass": password, "token": token };
        let url = "/api.php?controller=User&function=login";
        return this.http.post<any>(url, json, { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) })
            .pipe(map(datos => {
                // login successful if there's a jwt token in the response
                let user = datos["data"][0];
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    //next permite modificar el valor del usuario en el currentUserSubject
                    this.currentUserSubject.next(user);
                }
                return user;
            }));
    }

    logout() {
        let user = JSON.parse(localStorage.getItem('currentUser'));
        let json = { "id": user.idUser };
        let url = "/api.php?controller=User&function=logout";

        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
        //hago peticion al back para vaciar token
        this.http.post<any>(url, json, { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) })
            .subscribe(
                resul => {
                    console.log(resul);
                }
            );
    }

}