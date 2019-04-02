import { Component, OnInit } from '@angular/core';
import { User } from 'src/assets/models/User';
import { Project } from 'src/assets/models/Project';
import { ProjectService } from '../services/project.service';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RatingModule, Rating } from "ngx-rating";

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']

})

export class HomeComponent implements OnInit {
  currentUser: User;
  projectsInProgress: Array<Project>;
  projectsFinished: Array<Project>;

  constructor(private projectService: ProjectService, private router: Router) { }
  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.getProjectsInProgress();
    this.getProjectsFinished();

  }
  getProjectsInProgress() {
    this.projectService.getProjectNoFinished().subscribe(
      result => {
        this.projectsInProgress = result["data"];
        for (let i = 0; i < this.projectsInProgress.length; i++) {
          const element = this.projectsInProgress[i];
          this.projectService.getProjectFavorite(this.projectsInProgress[i].idProject).subscribe(
            result => {
              this.projectsInProgress[i]["likes"] = result["data"];
            }, error => {
              this.projectsInProgress[i]["likes"] = 0;
            }
          )
        }
      },
      error => { }
    )
  }

  getProjectsFinished() {
    this.projectService.getProjectFinished().subscribe(
      result => {
        this.projectsFinished = result["data"];
        for (let i = 0; i < this.projectsFinished.length; i++) {
          const element = this.projectsFinished[i];
          this.projectService.getProjectStar(this.projectsFinished[i].idProject).subscribe(
            result => {
              this.projectsFinished[i]["stars"] = result["data"];
            }, error => {
              this.projectsFinished[i]["stars"] = 0;
            }
          )
        }
      },
      error => { }
    )
  }



  ctrl = new FormControl(null, Validators.required);

  toggle() {
    if (this.ctrl.disabled) {
      this.ctrl.enable();
    } else {
      this.ctrl.disable();
    }
  }

}