import { Component } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AuthenticationService } from "../services/authentication.service";
import { Router } from "@angular/router";
import { User } from "src/assets/models/User";
import { Subscription } from "rxjs";
import { Post } from "src/assets/models/Post";
import { MessageProjectService } from "../services/message-project.service";
import { MessageProject } from "src/assets/models/MessageProject";
@Component({
    selector: 'muroSend',
    templateUrl: './muroSend.component.html'
})

export class MuroSendComponent {

    submitted = false;
    messageForm: FormGroup;
    currentUser: User;
    currentUserSubscription: Subscription;
    newMessage: MessageProject;


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
            newMessage: ['', Validators.required]
        });
    }

    get f() { return this.messageForm.controls; }

    sendForm() {

        this.submitted = true;
        if (this.messageForm.invalid) {
            return;
        }

        this.newMessage = this.messageForm.value;

        this.messageService.registerMessage(this.newMessage, this.currentUser.token)
            .subscribe(
                resul => {
                    console.log(resul);
                },
                error => {
                    console.log(error);
                }
            );
    }
}