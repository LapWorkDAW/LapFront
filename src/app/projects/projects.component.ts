import { Component, OnInit } from "@angular/core";
import { Project } from "src/assets/models/Project";
import { ProjectService } from "../services/project.service";

@Component({
    selector: 'projects',
    templateUrl: './projects.component.html',
    styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
    projectsInProgres: Array<Project>;
    projectsFinished: Array<Project>;

    constructor(private projectService: ProjectService) { }

    ngOnInit(): void {
        this.getProjectsInProgress();
        this.getProjectsFinished();
    }

    getProjectsInProgress() {
        this.projectService.getProjectNoFinished().subscribe(
            result => {
                this.projectsInProgres = result["data"];
                for (let i = 0; i < this.projectsInProgres.length; i++) {
                    this.projectService.getProjectFavorite(this.projectsInProgres[i].idProject).subscribe(
                        result => {
                            this.projectsInProgres[i]["likes"] = result["data"];
                        }, error => {
                            this.projectsInProgres[i]["likes"] = 0;
                        }
                    )
                }
            },
            error => { }
        )
    }

    getProjectsFinished() {
        this.projectService.getProjectFinished().subscribe(
            result => {
                this.projectsFinished = result["data"];
                for (let i = 0; i < this.projectsFinished.length; i++) {
                    this.projectService.getProjectStar(this.projectsFinished[i].idProject).subscribe(
                        result => {
                            this.projectsFinished[i]["stars"] = result["data"];
                        }, error => {
                            this.projectsFinished[i]["stars"] = 0;
                        }
                    )
                }
            },
            error => { }
        )
    }
}