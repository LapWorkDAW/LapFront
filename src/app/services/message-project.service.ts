import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';
import { MessageProject } from 'src/assets/models/MessageProject';

@Injectable({
  providedIn: 'root'
})
export class MessageProjectService {

  constructor(private http: HttpClient) { }

  registerMessage(message: MessageProject, token:string): Observable<any> {
    let url = "/api.php?controller=Project";
    return this.http.post(url, message, {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    });
  }

  getAllMessage(id:number){
    let url = "/api.php?controller=Project&id="+id;
    return this.http.get(url,{
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    });
  }
}
