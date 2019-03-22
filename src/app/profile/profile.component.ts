import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/assets/models/User';
import { UserService } from '../services/user.service';
import { ProjectService } from '../services/project.service';
import { AuthenticationService } from '../services/authentication.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { GooglePlacesDirective } from '../google-places.directive';
import { Project } from 'src/assets/models/Project';

@Component({
    selector: 'profile',
    templateUrl: './profile.component.html',
    styleUrls: ['../home/home.component.css', './profile.component.css']
    , providers: [GooglePlacesDirective]
})
export class ProfileComponent implements OnInit, OnDestroy {
    active_myProjects = "";
    active_favourites = "";
    active_joinProjects = "";

    currentUser: User;
    currentUserSubscription: Subscription;
    userLocation: String;
    projectsStar: Array<Project>;
    projectsFavorite: Array<Project>;
    projectsInProgress: Array<Project>;
    projectsFinished: Array<Project>;

    constructor(
        private _activRoute: ActivatedRoute,
        private authenticationService: AuthenticationService, private projectService: ProjectService,
        private userService: UserService, private router: Router,
        private googlePlacesDirective: GooglePlacesDirective
    ) {
        this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
            this.currentUser = user;
        });
        if (this.currentUser == null) {
            this.router.navigate(['']);
        }
    }

    ngOnInit(): void {
        this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
        console.log(this.currentUser);
        //Retrieve address in string format
        /* this.googlePlacesDirective.getAddress(this.currentUser.latitude, this.currentUser.longitude);
         this.userLocation = localStorage.getItem("city"); */
        this._activRoute.params.forEach(
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
        );
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
        this.projectService.getProjectNoFinished(this.currentUser.token).subscribe(
            result => {
                this.projectsInProgress = result["data"];
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
            },
            error => {
                console.log(error);
            }
        )
    }

    getProjectsStar() {
        this.projectService.getProjectStar(this.currentUser.token).subscribe(
            result => {
                this.projectsStar = result["data"];
            },
            error => {
                console.log(error);
            }
        )
    }

    getProjectsFavorite() {
        this.projectService.getProjectStar(this.currentUser.token).subscribe(
            result => {
                this.projectsStar = result["data"];
            },
            error => {
                console.log(error);
            }
        )
    }

    ngOnDestroy(): void { }

}