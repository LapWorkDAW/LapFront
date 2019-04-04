import { Component, OnInit } from "@angular/core";
import { Project } from "src/assets/models/Project";
import { ProjectService } from "../services/project.service";

@Component({
    selector: 'projects',
    templateUrl: './projects.component.html',
    styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
    ngOnInit(): void {
        this.getProjectsInProgress();
        this.getProjectsFinished();
    }
    projectsInProgress: Array<Project>;
    projectsFinished: Array<Project>;

    constructor(private projectService: ProjectService) { }

    getProjectsInProgress() {
        this.projectService.getProjectNoFinished().subscribe(
            result => {
                this.projectsInProgress = result["data"];
                for (let i = 0; i < this.projectsInProgress.length; i++) {
                    const element = this.projectsInProgress[i];
                    this.projectService.getProjectFavorite(this.projectsInProgress[i].idProject).subscribe(
                        result => {
                            this.projectsInProgress[i]["likes"] = result["data"];
                        }, error => {
                            this.projectsInProgress[i]["likes"] = 0;
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
                    const element = this.projectsFinished[i];
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