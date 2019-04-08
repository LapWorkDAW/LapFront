import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/assets/models/User';
import { UserService } from '../services/user.service';
import { ProjectService } from '../services/project.service';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';/* ActivatedRoute, Params */
import { Project } from 'src/assets/models/Project';

@Component({
    selector: 'profile',
    templateUrl: './profile.component.html',
    styleUrls: ['../home/home.component.css', './profile.component.css']

})
export class ProfileComponent implements OnInit, OnDestroy {
    /* active_myProjects = "";
    active_favourites = "";
    active_joinProjects = ""; */

    currentUser: User;
    currentUserSubscription: Subscription;
    projectsStar: Array<Project>;
    projectsFavorite: Array<Project>;
    projectsInProgress: Array<Project>;
    projectsFinished: Array<Project>;
    photo: boolean = true;
    typesProject: Array<String>;

    constructor(
        /* private _activRoute: ActivatedRoute, */
        private authenticationService: AuthenticationService, private projectService: ProjectService,
        private userService: UserService, private router: Router
    ) {
        this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
            this.currentUser = user;
        });
        if (this.currentUser == null) {
            this.router.navigate(['']);
        }

        if (this.currentUser.photo == null) {
            this.photo = false;
        }
    }

    ngOnInit(): void {
        this.currentUser = JSON.parse(localStorage.getItem("currentUser"));

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
                this.projectsInProgress = result["data"];
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
            },
            error => {
                console.log(error);
            }
        )
    }

    /* getProjectsStar() {
        this.projectService.getProjectStar(this.currentUser.token).subscribe(
            result => {
                this.projectsStar = result["data"];
            },
            error => {
                console.log(error);
            }
        )
    } */

    /* getProjectsFavorite() {
        this.projectService.getProjectStar(this.currentUser.token).subscribe(
            result => {
                this.projectsStar = result["data"];
            },
            error => {
                console.log(error);
            }
        )
    
    } */
    ngOnDestroy(): void { }
}