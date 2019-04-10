import { Injectable } from '@angular/core';
import { VProjectStar } from 'src/assets/models/VProjectStar';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VProjectStarService {

  constructor(private http: HttpClient) { }

  vote(date: VProjectStar, token: string) {
    let url = "/api.php?controller=VProjectStar&function=allvotes&token=" + token;
    return this.http.post(
      url, date, { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
    );
  }
}
