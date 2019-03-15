import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InscriptionService {

  constructor(private http: HttpClient) { }

  inscription(token:String, data){
    let url = "/api.php?controller=Team&token=" + token;
    return this.http.post(
      url, data, { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
    );
  }
}
