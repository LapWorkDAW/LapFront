import { Component, OnInit } from '@angular/core';
import { User } from 'src/assets/models/User';
import { Project } from 'src/assets/models/Project';
import { ProjectService } from '../services/project.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  currentUser: User;
  projectsInProgress: Array<Project>;
  projectsFinished: Array<Project>;

  constructor(private projectService: ProjectService) { }
  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.getProjectsInProgress();
    this.getProjectsFinished();
  }
  getProjectsInProgress() {
    this.projectService.getProjectNoFinished(this.currentUser.token).subscribe(
      result => {
        this.projectsInProgress = result["data"];
        console.log("progress");

        console.log(this.projectsInProgress);

      },
      error => {
        console.log(error);
      }
    )
  }

  getProjectsFinished() {
    this.projectService.getProjectFinished(this.currentUser.token).subscribe(
      result => {
        this.projectsFinished = result["data"];
        console.log("finsh");

        console.log(this.projectsFinished);
      },
      error => {
        console.log(error);
      }
    )
  }

}