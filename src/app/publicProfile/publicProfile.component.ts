import { Component } from "@angular/core";
import { User } from "src/assets/models/User";
import { UserService } from "../services/user.service";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { ProjectService } from "../services/project.service";


@Component({
    selector: 'publicProfile',
    templateUrl: './publicProfile.component.html'
})
export class PublicProfileComponent {
    currentUser: User;
    user: User = new User();
    allProjects: Array<String>;
    id: number;
    dataExist:boolean=false;

    constructor(private userService: UserService, private projectService: ProjectService,
        private _activRoute: ActivatedRoute) { }

    ngOnInit(): void {
        this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
        if (this.currentUser != null) {
            if (this.currentUser.photo == null || this.currentUser.photo == "") {
                this.currentUser.photo = 'assets/userAssets/photos/girl.jpg';
            }
        }

        this._activRoute.params.forEach(
            (arrayParams: Params) => {
                this.id = arrayParams["id"];
            });

        this.userService.getUserById(this.id).subscribe(
            result => {
                this.user = result["data"];

                if (this.user.photo == null || this.user.photo == "") {
                    this.user.photo = 'assets/userAssets/photos/girl.jpg';
                }
            },
            error => {
            }
        )
        this.getAllProjects(this.id);
    }

    getAllProjects(id: number) {
        this.projectService.getAllProjectsByUser(id).subscribe(
            result => {
                console.log(result["data"]);
                this.allProjects = result["data"];
                if(this.allProjects.length!=0){
                    this.dataExist=true;
                }
            },
            error => {
                console.log(error);
            }
        )


    }
}