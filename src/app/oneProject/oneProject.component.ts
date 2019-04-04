import { Component } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { Project } from "src/assets/models/Project";
import { ProjectService } from '../services/project.service';
import { User } from "src/assets/models/User";
import { Subscription } from "rxjs";
import { AuthenticationService } from "../services/authentication.service";
import { FormControl, Validators } from "@angular/forms";

@Component({
    selector: 'oneProject',
    templateUrl: './oneProject.component.html',
    styleUrls: ['./oneProject.component.css']
})
export class OneProjectComponent {
    id: number;
    project: Project;
    isVote: boolean;
    isLike: boolean;
    currentUser: User;
    ctrl = new FormControl(null, Validators.required);

    constructor(private _router: Router, private projectService: ProjectService,
        private _activRoute: ActivatedRoute) { }

    ngOnInit() {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));

        this._activRoute.params.forEach(
            (arrayParams: Params) => {
                this.id = arrayParams["id"];
            });

        this.projectService.getOneProject(this.id).subscribe(
            resul => {
                this.project = resul["data"];
            },
            error => {

            }
        )
        if (this.project.projectStatus == 0) {
            this.isLike = true;
        } else {
            this.isLike = false;
        }

        this.isVoted();
    }
    //0-no esta votado, 1 - si

    isVoted() {
        if (this.project.projectStatus == 0) {
            this.projectService.checkVoteLike(this.currentUser.token, this.project.idProject).subscribe(
                result => {
                    if (result["data"] == 0) {
                        this.isVote = false;
                    } else {
                        this.isVote = true;
                    }
                },
                error => {

                }
            )
        } else {
            this.projectService.checkVoteStar(this.currentUser.token, this.project.idProject).subscribe(
                result => {
                    if (result["data"] == 0) {
                        this.isVote = false;
                    } else {
                        this.isVote = true;
                    }
                },
                error => {

                }
            )
        }
    }

    toggle() {
        /* this.ctrl.value */
        this.ctrl.disable();
    }

}