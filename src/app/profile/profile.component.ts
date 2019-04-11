import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/assets/models/User';
import { UserService } from '../services/user.service';
import { ProjectService } from '../services/project.service';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';/* ActivatedRoute, Params */
import { Project } from 'src/assets/models/Project';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'profile',
    templateUrl: './profile.component.html',
    styleUrls: ['../home/home.component.css', './profile.component.css'],
    styles: [`
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
  `],
    providers: [NgbRatingConfig]
})
export class ProfileComponent implements OnInit, OnDestroy {
    /* active_myProjects = "";
    active_favourites = "";
    active_joinProjects = ""; */

    currentUser: User;
    currentUserSubscription: Subscription;
    projectsStar: Array<Project>;
    projectsFavorite: Array<Project>;
    projectsInProgres: Array<Project>;
    projectsFinished: Array<Project>;
    photo: boolean = true;
    typesProject: Array<String>;

    constructor(
        /* private _activRoute: ActivatedRoute, */
        private authenticationService: AuthenticationService, private projectService: ProjectService,
        private userService: UserService, private router: Router, config: NgbRatingConfig
    ) {
        config.max = 1;
        this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
            this.currentUser = user;
        });
        if (this.currentUser == null) {
            this.router.navigate(['']);
        }
    }

    ngOnInit(): void {
        this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
        //set default user image in case if user do not image 
        if (this.currentUser.photo == null) {
            this.currentUser.photo = 'assets/userAssets/photos/girl.jpg';
        }

        this.projectService.getTypesProject(this.currentUser.token).subscribe(
            result => {
                this.typesProject = result["data"];
            },
            error => {
                console.log(error);
            }
        );
        /* this._activRoute.params.forEach(
            (arrayParams: Params) => {
                let option = arrayParams["option"];
                switch (option) {
                    case "myProjects":
                        this.active_myProjects = "active";
                        break;
                    case "favourites":
                        this.active_favourites = "active";
                        break;
                    case "joinProjects":
                        this.active_joinProjects = "active";
                        break;
                    default:
                        this.active_myProjects = "active";
                }
            }
        ); */

        this.getProjectsInProgress();
        this.getProjectsFinished();
        this.getProjectsStar();
        this.getProjectsFavorite();
    }


    deleteUser() {
        this.userService.delete(this.currentUser.token).subscribe(
            result => {
                console.log(result);
            },
            error => {
                console.log(error);
            });
    }

    getProjectsInProgress() {
        this.projectService.getProjectNoFinishedUser(this.currentUser.token).subscribe(
            result => {
                this.projectsInProgres = result["data"];
                for (let i = 0; i < this.projectsInProgres.length; i++) {
                    if (this.projectsInProgres[i].img == null) {
                        this.projectsInProgres[i].img = 'assets/icons/standard/books.jpg';
                    }
                    this.projectService.getProjectFavorite(this.projectsInProgres[i].idProject).subscribe(
                        result => {
                            this.projectsInProgres[i]["likes"] = result["data"];
                        }, error => {
                            this.projectsInProgres[i]["likes"] = 0;
                        }
                    )
                }
            },
            error => {
                console.log(error);
            }
        )
    }

    getProjectsFinished() {
        this.projectService.getProjectFinishedUser(this.currentUser.token).subscribe(
            result => {
                this.projectsFinished = result["data"];
                for (let i = 0; i < this.projectsFinished.length; i++) {
                    if (this.projectsFinished[i].img == null) {
                        this.projectsFinished[i].img = 'assets/icons/standard/books.jpg';
                    }
                    this.projectService.getProjectStar(this.projectsFinished[i].idProject).subscribe(
                        result => {
                            this.projectsFinished[i]["stars"] = result["data"];
                        }, error => {
                            this.projectsFinished[i]["stars"] = 0;
                        }
                    )
                }
            },
            error => {
                console.log(error);
            }
        )
    }

    getProjectsStar() {
        this.projectService.getProjectsStarUser(this.currentUser.token).subscribe(
            result => {
                this.projectsStar = result["data"];
                console.log(result["data"]);

                for (let i = 0; i < this.projectsStar.length; i++) {
                    if (this.projectsStar[i]["project"].img == null) {
                        this.projectsStar[i]["project"].img = 'assets/icons/standard/books.jpg';
                    }
                    this.projectService.getProjectStar(this.projectsStar[i].idProject).subscribe(
                        result => {
                            this.projectsStar[i]["stars"] = result["data"];
                        }, error => {
                            this.projectsStar[i]["stars"] = 0;
                        }
                    )
                }

            },
            error => {
                console.log(error);
            }
        )
    }

    getProjectsFavorite() {
        this.projectService.getProjectsFavoriteUser(this.currentUser.token).subscribe(
            result => {
                this.projectsFavorite = result["data"];
                for (let i = 0; i < this.projectsFavorite.length; i++) {
                    if (this.projectsFavorite[i]["project"].img == null) {
                        this.projectsFavorite[i]["project"].img = 'assets/icons/standard/books.jpg';
                    }
                    this.projectService.getProjectFavorite(this.projectsFavorite[i].idProject).subscribe(
                        result => {
                            this.projectsFavorite[i]["likes"] = result["data"];
                        }, error => {
                            this.projectsFavorite[i]["likes"] = 0;
                        }
                    )
                }
            },
            error => {
                console.log(error);
            }
        )

    }
    ngOnDestroy(): void { }
}