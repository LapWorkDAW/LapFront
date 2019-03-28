import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthenticationService } from "../services/authentication.service";
import { UserService } from "../services/user.service";
import { ProjectService } from "../services/project.service";
import { User } from "src/assets/models/User";
import { Subscription } from "rxjs";
import { Project } from "src/assets/models/Project";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidateDate } from '../_helpers/date.validator';

@Component({
    selector: 'createProject',
    templateUrl: './createProject.component.html',
    styleUrls: ['./createProject.component.css']
})
export class CreateProjectComponent implements OnInit {
    currentUser: User;
    currentUserSubscription: Subscription;
    typesProject: Array<String>;
    newProject: Project = new Project();
    createProjectForm: FormGroup;
    submitted = false;

    constructor(
        private _activRoute: ActivatedRoute,
        private authenticationService: AuthenticationService, private projectService: ProjectService,
        private userService: UserService, private router: Router, private formBuilder: FormBuilder
    ) {
        this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
            this.currentUser = user;
        });
        if (this.currentUser == null) {
            this.router.navigate(['']);
        }
    }

    ngOnInit(): void {
        this.projectService.getTypesProject(this.currentUser.token).subscribe(
            result => {
                this.typesProject = result["data"];
            },
            error => {
                console.log(error);
            }
        );

        this.createProjectForm = this.formBuilder.group({
            projectName: ['', Validators.required],
            description: ['', Validators.required],
            idType: ['', Validators.required],
            dateFinish: ['', Validators.required],
            img: ['']
        }, {
                validator: ValidateDate('dateFinish')
            });
    }

    get f() { return this.createProjectForm.controls; }

    sendForm() {
        this.submitted = true;

        if (this.createProjectForm.invalid) {
            return;
        }
        console.log(this.createProjectForm.value);
        this.newProject = this.createProjectForm.value;
        this.newProject.userO = this.currentUser;
        console.log(this.newProject);

        this.projectService.register(this.currentUser.token, this.newProject)
            .subscribe(
                resul => {
                    console.log(resul);

                },
                error => {
                    console.log(error);

                }
            );
        this.newProject = new Project();
        this.createProjectForm.reset();
    }
}