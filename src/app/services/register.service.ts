import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }

  checkUserEmail(email:String): Observable<any>{
    let url = "";
    return this.http.get(
      url,{ headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
    );
  }
}
