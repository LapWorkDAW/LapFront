import { Component } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { Project } from "src/assets/models/Project";
import { ProjectService } from '../services/project.service';
import { User } from "src/assets/models/User";
import { Subscription } from "rxjs";
import { AuthenticationService } from "../services/authentication.service";
import { FormControl, Validators } from "@angular/forms";
import { VProjectStarService } from "../services/v-project-star.service";
import { VProjectStar } from "src/assets/models/VProjectStar";
import { VProjectFav } from "src/assets/models/VProjectFav";
import { VProjectFavService } from "../services/v-project-fav.service";

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
    userExistAndNoVoted: boolean = true; //para habilitar poder de votar
    ctrl = new FormControl(null, Validators.required);
    star: VProjectStar = new VProjectStar();
    like: VProjectFav = new VProjectFav();

    constructor(private _router: Router, private projectService: ProjectService,
        private _activRoute: ActivatedRoute, private voteStar: VProjectStarService,
        private voteLike: VProjectFavService) {
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
                        this.userExistAndNoVoted = true;
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

    toggleStar() {
        this.star.project = this.project;
        this.star.quantity = this.ctrl.value;
        this.star.userVote = this.currentUser;
        this.voteStar.vote(this.star, this.currentUser.token).subscribe(
            result => {
                console.log(result);
                this.ctrl.disable();
                this.ctrl.valid;
            },
            error => {
                console.log("error");

            }
        )
    }

    toggleLike() {
        this.like.project = this.project;
        this.like.userVote = this.currentUser;
        this.voteLike.vote(this.like, this.currentUser.token).subscribe(
            result => {
                console.log(result);
                this.ctrl.disable();
                this.ctrl.valid;
            },
            error => {
                console.log("error");

            }
        )
    }
}