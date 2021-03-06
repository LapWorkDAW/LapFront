import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AuthenticationService } from "../services/authentication.service";
import { Router } from "@angular/router";
import { User } from "src/assets/models/User";
import { Subscription } from "rxjs";
import { Post } from "src/assets/models/Post";
import { MessageProjectService } from "../services/message-project.service";
import { MessageProject } from "src/assets/models/MessageProject";
import { Project } from "src/assets/models/Project";
import { projection } from "@angular/core/src/render3/instructions";
@Component({
    selector: 'muroSend',
    templateUrl: './muroSend.component.html'
})

export class MuroSendComponent implements OnInit {

    submitted = false;
    messageForm: FormGroup;
    currentUser: User;
    currentUserSubscription: Subscription;
    newMessage: MessageProject = new MessageProject();
    owner: boolean = false;
    enterMessage: boolean = false;
    lengthMessage: boolean = false;
    @Input() project: Project;
    @Output() onGetEventFill = new EventEmitter();



    constructor(private authenticationService: AuthenticationService, private messageService: MessageProjectService,
        private router: Router,
        private formBuilder: FormBuilder) {
        this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
            this.currentUser = user;
        });
        if (this.currentUser == null) {
            this.router.navigate(['']);
        }

    }

    ngOnInit(): void {
        this.messageForm = this.formBuilder.group({
            newMessage: ['', Validators.minLength(15)]
        });
        window.setInterval(() => {
            if (this.currentUser.firstname + " " + this.currentUser.surname === this.project.nameCreator) {
                this.owner = true;
            }
        }, 1);
    }

    get f() { return this.messageForm.controls; }

    sendForm() {

        this.submitted = true;
        this.enterMessage = this.messageForm.get('newMessage').value == "";

        this.lengthMessage = <number>this.messageForm.get('newMessage').value.length < 20;

        if (this.enterMessage || this.lengthMessage) {
            return;
        }

        this.newMessage.project = this.project;
        this.newMessage.post.message = this.messageForm.value["newMessage"];
        this.newMessage.post.remitter = this.currentUser;

        this.messageService.registerMessage(this.newMessage, this.currentUser.token)
            .subscribe(
                resul => {
                    this.sendEventToParent();
                },
                error => {
                    console.log(error);
                    this.sendEventToParent();
                }
            );

        this.messageForm.reset();
        for (let name in this.messageForm.controls) {
            this.messageForm.controls[name].setErrors(null);
        }
    }

    sendEventToParent() {
        this.onGetEventFill.emit();
    }
}