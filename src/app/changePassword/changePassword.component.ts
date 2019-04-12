import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { UserService } from "../services/user.service";
import { User } from "src/assets/models/User";
import { Subscription, Subject } from "rxjs";
import { AuthenticationService } from "../services/authentication.service";
import { Router } from "@angular/router";
import { MustMatch } from "../_helpers/must-match.validator";
import { debounceTime } from "rxjs/operators";

@Component({
    selector: 'changePassword',
    templateUrl: 'changePassword.component.html',
    styleUrls: ['changePassword.component.css']
})
export class ChangePasswordComponent implements OnInit {
    submitted = false;
    passwordForm: FormGroup;
    isPasswordMatch: boolean;
    newPassword: string;
    currentUser: User;
    currentUserSubscription: Subscription;
    dateModifiedSuccessfull: boolean = false;


    constructor(private userService: UserService,
        private authenticationService: AuthenticationService,
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
        this.passwordForm = this.formBuilder.group({
            oldPassword: ['', Validators.required],
            newPassword: ['', [Validators.required, Validators.minLength(6)]],
            confirmPassword: ['', Validators.required],
        }, {
                validator: MustMatch('newPassword', 'confirmPassword')
            });
    }


    get f() { return this.passwordForm.controls; }

    sendForm() {

        this.submitted = true;
        if (this.passwordForm.invalid || this.isPasswordMatch) {
            return;
        }

        this.newPassword = this.passwordForm.value;
        delete this.newPassword['confirmPassword'];

        /* this.userService.updatePassword(this.newPassword, this.currentUser.token)
            .subscribe(
                resul => {
                    this.dateModifiedSuccessfull = true;
                    console.log(resul);
                },
                error => {
                    console.log(error);
                }
            ); */

        this.passwordForm.reset();
        /*  for (let name in this.passwordForm.controls) {
             this.passwordForm.controls[name].setErrors(null);
         } */
    }
}