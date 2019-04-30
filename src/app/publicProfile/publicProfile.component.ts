import { Component } from "@angular/core";
import { User } from "src/assets/models/User";
import { AuthenticationService } from "../services/authentication.service";
import { UserService } from "../services/user.service";
import { Subscription } from "rxjs";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { ProjectService } from "../services/project.service";

@Component({
    selector: 'publicProfile',
    templateUrl: './publicProfile.component.html'
})
export class PublicProfileComponent {
    currentUser: User;
    currentUserSubscription: Subscription;
    typesProject: Array<String>;
    allProjects: Array<String>;
    id: number;

    constructor(private authenticationService: AuthenticationService,
        private userService: UserService,
        private router: Router,
        private projectService: ProjectService,
        private _activRoute: ActivatedRoute

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
        if (this.currentUser.photo == null || this.currentUser.photo == "") {
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
        this.getAllProjects();

        this._activRoute.params.forEach(
            (arrayParams: Params) => {
                this.id = arrayParams["id"];
            });

    }
    getAllProjects() {
        this.projectService.getAllProjects().subscribe(
            result => {
                this.allProjects = result["data"];
                console.log(result["data"]);

            },
            error => {
                console.log(error);
            }
        )
    }
}