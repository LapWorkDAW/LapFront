import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { VProjectFav } from 'src/assets/models/VProjectFav';

@Injectable({
  providedIn: 'root'
})
export class VProjectFavService {

  constructor(private http: HttpClient) { }

  vote(date: VProjectFav, token: string) {
    let url = "/api.php?controller=VProjectFav&token=" + token;
    return this.http.post(
      url, date, { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
    );
  }

}
