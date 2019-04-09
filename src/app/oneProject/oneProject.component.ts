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
import { NgbRatingConfig } from "@ng-bootstrap/ng-bootstrap";

@Component({
    selector: 'oneProject',
    templateUrl: './oneProject.component.html',
    styleUrls: ['./oneProject.component.css'],
    styles: [`
    .star {
      font-size: 1.5rem;
      color: #b0c4de;
    }
    .filled {
      color: #1e90ff;
    }
    .bad {
      color: #b0c4de;
    }
    .filled.bad {
      color: #007bff;
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
export class OneProjectComponent {
    id: number;
    project: Project = new Project();
    isVote: boolean; //si esta valorado
    isLike: boolean = false; //para saber si mostrar estrellas o corazones
    currentUser: User;
    userExistAndNoVoted: boolean = false; //para habilitar poder de votar
    userExistAndNoLike: boolean = false;
    ctrl = new FormControl(null, Validators.required);
    star: VProjectStar = new VProjectStar();
    like: VProjectFav = new VProjectFav();

    constructor(private _router: Router, private projectService: ProjectService,
        private _activRoute: ActivatedRoute, private voteStar: VProjectStarService,
        private voteLike: VProjectFavService, config: NgbRatingConfig) {
        config.max = 1;
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

                if (status == 0) { //finished
                    this.isLike = false;
                    this.projectService.getProjectStar(this.project.idProject).subscribe(
                        result => {
                            this.project["stars"] = result["data"];
                        }, error => {
                            this.project["stars"] = 0;
                        });
                } else { //not finished
                    this.isLike = true;
                    this.projectService.getProjectFavorite(this.project.idProject).subscribe(
                        result => {
                            this.project["likes"] = result["data"];
                        }, error => {
                            this.project["likes"] = 0;
                        }
                    )
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
                        this.userExistAndNoVoted = true;
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
                        this.userExistAndNoLike = true;
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
            },
            error => {
                console.log("error");
                this.ctrl.enable();
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
            },
            error => {
                console.log("error");
                this.ctrl.enable();
            }
        )
    }
}