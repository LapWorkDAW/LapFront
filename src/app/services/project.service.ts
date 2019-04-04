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
      url, project, { headers: new HttpHeaders({ 'enctype': 'multipart/form-data' }) }
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

  getProjectFinished() {
    let url = "/api.php?controller=Project&function=getfinish";
    return this.http.get(
      url, { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
    );
  }

  getProjectNoFinished() {
    let url = "/api.php?controller=Project&function=getnofinish";
    return this.http.get(
      url, { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
    );
  }

  getProjectStar(id: number) {
    let url = "/api.php?controller=VProjectStar&function=allvotes&id=" + id;
    return this.http.get(
      url, { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
    );
  }

  getProjectFavorite(id: number) {
    let url = "/api.php?controller=VProjectFav&function=allvotes&id=" + id;
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

  getOneProject(id: number) {
    let url = "/api.php?controller=Project&function=projectid&id=" + id;
    return this.http.get(
      url, { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
    );
  }

  checkVoteStar(token: string, id: number) {
    let url = "/api.php?controller=ProjectStar&function=userprojectd&id=" + id + "&token=" + token;
    return this.http.get(
      url, { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
    );
  }

  checkVoteLike(token: string, id: number) {
    let url = "/api.php?controller=ProjectFav&function=userproject&id=" + id + "&token=" + token;
    return this.http.get(
      url, { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
    );
  }
}
