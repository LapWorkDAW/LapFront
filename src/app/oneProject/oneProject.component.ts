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
    isVote: boolean; //si esta valorado
    isLike: boolean; //para saber si mostrar estrellas o corazones
    currentUser: User;
    userExistAndNoVoted: boolean = false; //para habilitar poder de votar
    ctrl = new FormControl(null, Validators.required);

    constructor(private _router: Router, private projectService: ProjectService,
        private _activRoute: ActivatedRoute) {

    }

    ngOnInit() {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));

        this._activRoute.params.forEach(
            (arrayParams: Params) => {
                this.id = arrayParams["id"];
            });

        this.projectService.getOneProject(this.id).subscribe(
            resul => {
                this.project = resul["data"];
                let status = resul["data"]["projectStatus"];
                let id = resul["data"]["idProject"];
                if (status == 0) {
                    this.isLike = true;
                } else {
                    this.isLike = false;
                }
                if (this.currentUser) {
                    this.isVoted(status, id);
                }
            },
            error => {
            }
        )
    }
    //0-no esta votado, 1 - si

    isVoted(status, id) {
        //0-no acabado, 1-acabado
        if (status == 0) {
            console.log("Like");
            this.projectService.checkVoteLike(this.currentUser.token, id).subscribe(
                result => {
                    if (result["data"] == 0) {
                        console.log(result["data"]);
                        this.isVote = false;
                    } else {
                        console.log("error");
                        this.isVote = true;
                    }
                },
                error => {
                }
            )
        } else {
            console.log("Star");
            this.projectService.checkVoteStar(this.currentUser.token, id).subscribe(
                result => {
                    if (result["data"] == 0) {
                        console.log(result["data"]);
                        this.isVote = false;
                    } else {
                        console.log("error");
                        this.isVote = true;
                    }
                },
                error => {
                }
            )
        }
    }

    toggle() {
        console.log(this.ctrl.value);
        this.ctrl.disable();
        this.ctrl.valid;
    }

}