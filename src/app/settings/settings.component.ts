import { Component, OnInit, NgZone } from "@angular/core";
import { User } from "src/assets/models/User";
import { Router } from "@angular/router";
import { AuthenticationService } from "../services/authentication.service";
import { UserService } from "../services/user.service";
import { ProjectService } from "../services/project.service";
import { Subscription, Subject } from "rxjs";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { debounceTime } from 'rxjs/operators';
import { MustMatch } from "../_helpers/must-match.validator";
import { AuthService } from "angular-6-social-login";

@Component({
    selector: 'settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
    currentUser: User;
    modifyUser: User = new User;
    currentUserSubscription: Subscription;
    googleOK: boolean = false;
    modifyUserForm: FormGroup;
    passwordForm: FormGroup;
    submittedPassword = false;
    submitted = false;
    public addrKeys: string[];
    public addr: object;
    dateModifiedSuccessfull: boolean = false;
    img;
    private _success = new Subject<string>();
    successMessage: string;

    constructor(
        /* private _activRoute: ActivatedRoute, */
        private authenticationService: AuthenticationService, private projectService: ProjectService,
        private userService: UserService, private router: Router, private formBuilder: FormBuilder,
        private zone: NgZone, private socialAuthService: AuthService
    ) {
        this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
            this.currentUser = user;
        });
        if (this.currentUser == null) {
            this.router.navigate(['']);
        }
    }

    ngOnInit(): void {
        window.setInterval(() => { this.googleOK = true; }, 100);
        this.modifyUserForm = this.formBuilder.group({
            firstname: [this.currentUser.firstname],
            surname: [this.currentUser.surname],
            location: [''],
            description: [this.currentUser.description],
            cv: [this.currentUser.cv],
            birthdate: [this.currentUser.birthdate],
            knowledge: [this.currentUser.knowledge],
            photo: []
        });
    }


    setAddress(addrObj) {
        this.zone.run(() => {
            this.addr = addrObj;
            this.addrKeys = Object.keys(addrObj);
        });
    }

    uploadDocument(event: any) {
        if (event.target.files && event.target.files[0]) {
            const reader = new FileReader();
            reader.onload = () => {
                this.img = event.target.files[0];
            };
            reader.readAsDataURL(event.target.files[0]);
        }
    }

    sendForm() {
        this.submitted = true;
        if (this.modifyUserForm.invalid) {
            return;
        }

        this.modifyUser = this.modifyUserForm.value;
        if (<String>this.modifyUserForm.get('location').value != undefined) {
            if (<String>this.modifyUserForm.get('location').value != "") {
                let newLocation = this.addr["city"] + ", " + this.addr["country"];
                this.modifyUser.location = newLocation;
            } else {
                this.modifyUser.location = this.currentUser.location;
            }
        } else {
            this.modifyUser.location = this.currentUser.location;
        }

        this.modifyUser.photo = this.currentUser.photo;
        const uploadData = new FormData();
        uploadData.append('user', JSON.stringify(this.modifyUser));
        uploadData.append('photo', this.img);
        this.userService.update(uploadData, this.currentUser.token)
            .subscribe(
                resul => {
                    this.dateModifiedSuccessfull = true;
                    localStorage.setItem('currentUser', JSON.stringify(resul["data"]));
                    console.log(resul);
                },
                error => {
                    console.log(error);
                }
            );

        /* this.modifyUser = new User();
         this.modifyUserForm.reset(); */
    }


    deleteAccount() {
        this.userService.delete(this.currentUser.token).subscribe(
            result => {
                this._success.next(`Your account was successfully deleted.`);
                /*  localStorage.clear();
                 setTimeout(() => this.router.navigate(['**']), 3000);
                 setTimeout(() => location.reload(), 2900); */
                this.currentUser = JSON.parse(localStorage.getItem('currentUser'));

                if (this.currentUser.pass === null || this.currentUser.pass === "") {
                    this.socialAuthService.signOut();
                }
                this.authenticationService.logout();
                this.router.navigate(['']);
            },
            error => {
                console.log("error");
                this._success.next(`There was an error deleting account. Try again later.`);
            }
        );
    }
}