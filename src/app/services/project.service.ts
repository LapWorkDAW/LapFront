import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Project } from 'src/assets/models/Project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient) { }

  register(token: String, project) {
    let url = "/api.php?controller=Project&token=" + token;
    return this.http.post(
      url, project, { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
    );
  }

  delete(token: String, id: number) {
    let url = "/api.php?controller=Project&token=" + token + "&";
    return this.http.delete(
      url, { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
    );
  }

  update(token: String, id: number, project: Project) {
    let url = "/api.php?controller=Project&token=" + token + "&id=" + id;
    return this.http.put(
      url, project, { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
    );
  }

  getProjectFinished(token: String) {
    let url = "/api.php?controller=Project&function=getfinish&token=" + token;
    return this.http.get(
      url, { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
    );
  }

  getProjectNoFinished(token: String) {
    let url = "/api.php?controller=Project&function=getnofinish&token=" + token;
    return this.http.get(
      url, { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
    );
  }

  getProjectStar(token: String) {
    let url = "/api.php?controller=VProjectStar&function=allVotes&token=" + token;
    return this.http.get(
      url, { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
    );
  }

  getProjectFavorite(token: String) {
    let url = "/api.php?controller=VProjectFav&function=allVotes&token=" + token;
    return this.http.get(
      url, { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
    );
  }

  getTypesProject(token: String) {
    let url = "/api.php?controller=TypeProject&token=" + token;
    return this.http.get(
      url, { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
    );
  }

}
