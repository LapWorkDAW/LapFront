import { Component, OnInit } from '@angular/core';
import { User } from 'src/assets/models/User';
import { Project } from 'src/assets/models/Project';
import { ProjectService } from '../services/project.service';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  styles: [`
    .star {
      position: relative;
      display: inline-block;
      font-size: 1rem;
      color: #d3d3d3;
    }
    .full {
      color:#007bff;
    }
    .half {
      position: absolute;
      display: inline-block;
      overflow: hidden;
      color: #007bff;
    }
    #Art {
      color: #99644c;
    }
    #Engineering {
      color: #7456bf;
    }
    #IT {
      color: #f25139;
    }
    #Literary {
      color: #ff7d49;
    }
    #Technological {
      color: #46b275;
    }

  `],
  providers: [NgbRatingConfig]
})

export class HomeComponent implements OnInit {
  currentUser: User;
  projectsInProgress: Array<Project>;
  projectsFinished: Array<Project>;
  /*  ctrl = new FormControl(null, Validators.required); */

  constructor(private projectService: ProjectService, private router: Router, config: NgbRatingConfig) {
    // customize default values of ratings used by this component tree
    config.max = 1;
  }
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

}