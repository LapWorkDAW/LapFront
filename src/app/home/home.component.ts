import { Component, OnInit } from '@angular/core';
import { User } from 'src/assets/models/User';
import { Project } from 'src/assets/models/Project';
import { ProjectService } from '../services/project.service';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { DomSanitizer} from '@angular/platform-browser';

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
  subirVisible:boolean=true;
  currentUser: User;
  projectsInProgres: Array<Project>;
  projectsFinished: Array<Project>;
  /*  ctrl = new FormControl(null, Validators.required); */

  constructor(private sanitizer: DomSanitizer, private projectService: ProjectService, private router: Router, config: NgbRatingConfig) {
    // customize default values of ratings used by this component tree
    config.max = 1;
  }
  ngOnInit(): void {    
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.getProjectsInProgress();
    this.getProjectsFinished();
    window.setInterval(() => {this.orderLike(); this.orderStar();}, 100);        
  }

  orderLike(){       
    this.projectsInProgres.sort(function (a, b) { return b["likes"] - a["likes"] });
  }

  orderStar(){
    this.projectsFinished.sort(function (a, b) { return b["stars"] - a["stars"] });
  }

  getProjectsInProgress() {
    this.projectService.getProjectNoFinished().subscribe(
      result => {
        this.projectsInProgres = result["data"];
        console.log(result["data"]);
        
        for (let i = 0; i < this.projectsInProgres.length; i++) {
          if (this.projectsInProgres[i].img == null || this.projectsInProgres[i].img == "") {
            this.projectsInProgres[i].img = 'assets/icons/standard/table7.jpg';
          
          }
            /* let url =this.sanitizer.bypassSecurityTrustUrl(this.projectsInProgres[i].img);
            this.projectsInProgres[i].img_safe=url; */
          
          this.projectService.getProjectFavorite(this.projectsInProgres[i].idProject).subscribe(
            result => {
              this.projectsInProgres[i]["likes"] = result["data"];
            }, error => {
              this.projectsInProgres[i]["likes"] = 0;
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
          if (this.projectsFinished[i].img == null || this.projectsFinished[i].img == "") {
            this.projectsFinished[i].img = 'assets/icons/standard/table3.jpg';
          }
          /* let url =this.sanitizer.bypassSecurityTrustUrl(this.projectsFinished[i].img); */
          /* this.projectsFinished[i].img_safe=url; */
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