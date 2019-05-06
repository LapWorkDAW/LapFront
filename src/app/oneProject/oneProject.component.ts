import { Component } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { Project } from "src/assets/models/Project";
import { ProjectService } from '../services/project.service';
import { User } from "src/assets/models/User";
import { FormControl, Validators } from "@angular/forms";
import { VProjectStarService } from "../services/v-project-star.service";
import { VProjectStar } from "src/assets/models/VProjectStar";
import { VProjectFav } from "src/assets/models/VProjectFav";
import { VProjectFavService } from "../services/v-project-fav.service";
import { NgbRatingConfig } from "@ng-bootstrap/ng-bootstrap";
import { MessageProject } from "src/assets/models/MessageProject";
import { MessageProjectService } from "../services/message-project.service";

@Component({
    selector: 'oneProject',
    templateUrl: './oneProject.component.html',
    styleUrls: ['./oneProject.component.css'],
    styles: [`
    .star {
      font-size: 1rem;
      color: #b0c4de;
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
    isLike: boolean = false; //para saber si mostrar estrellas o corazones
    currentUser: User;
    userExistAndNoVoted: boolean = false; //para habilitar poder de votar
    userExistAndNoLike: boolean = false;
    ctrl = new FormControl(null, Validators.required);
    star: VProjectStar = new VProjectStar();
    like: VProjectFav = new VProjectFav();
    messagesWall: Array<MessageProject>;
    datosExist:boolean=false;

    constructor(private projectService: ProjectService, private messageService: MessageProjectService,
        private _activRoute: ActivatedRoute, private voteStar: VProjectStarService,
        private voteLike: VProjectFavService, config: NgbRatingConfig) {
        config.max = 1;
    }

    ngOnInit() {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (this.currentUser != null) {
            if (this.currentUser.photo == null || this.currentUser.photo == "") {
                this.currentUser.photo = 'assets/userAssets/photos/girl.jpg';
            }
        }

        this._activRoute.params.forEach(
            (arrayParams: Params) => {
                this.id = arrayParams["id"];
            });

        this.projectService.getOneProject(this.id).subscribe(
            resul => {
                this.project = resul["data"];
                if (this.project.img == null || this.project.img == "") {
                    this.project.img = 'assets/icons/standard/table7.jpg';
                }
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

        this.messageService.getAllMessage(this.id).subscribe(
            result => {
                this.messagesWall = result["data"];
            },
            error => { }
        )

        this.getAllMessages();
    }
    //0-no esta votado, 1 - si

    isVoted(status, id) {
        //0-acabado, 1- no acabado
        if (status == 1) {
            this.projectService.checkVoteLike(this.currentUser.token, id).subscribe(
                result => {
                    if (result["data"] == 1) {
                        this.userExistAndNoLike = false;
                    } else {
                        this.userExistAndNoLike = true;
                    }
                },
                error => {
                }
            )
        } else {
            this.projectService.checkVoteStar(this.currentUser.token, id).subscribe(
                result => {
                    if (result["data"] == 1) {//0-no ha votado, 1-si ha votado                         
                        this.userExistAndNoVoted = false;
                    } else {
                        this.userExistAndNoVoted = true;
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
                this.ctrl.disable();
            },
            error => {
                this.ctrl.enable();
            }
        )
    }

    toggleLike() {
        this.like.project = this.project;
        this.like.userVote = this.currentUser;
        this.projectService.checkVoteLike(this.currentUser.token, this.id).subscribe(
            result => {
                if (result["data"] == 0) {
                    this.voteLike.vote(this.like, this.currentUser.token).subscribe(
                        result => {
                            this.ctrl.disable();
                        },
                        error => {
                            this.ctrl.enable();
                        }
                    )
                } else {
                    this.ctrl.disable();
                }
            },
            error => {
            }
        )
    }

    getAllMessages() {
        this.messageService.getAllMessage(this.id).subscribe(
            result => {                
                this.messagesWall = result["data"];
                if(this.messagesWall.length!=0){
                    this.datosExist=true;
                }
            },
            error => {
            }
        )
    }
}