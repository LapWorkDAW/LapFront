import { Component, OnInit, NgZone } from "@angular/core";
import { User } from "src/assets/models/User";
import { Router } from "@angular/router";
import { AuthenticationService } from "../services/authentication.service";
import { UserService } from "../services/user.service";
import { ProjectService } from "../services/project.service";
import { Subscription } from "rxjs";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

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
    submitted = false;
    public addrKeys: string[];
    public addr: object;
    dateModifiedSuccessfull: boolean = false;

    constructor(
        /* private _activRoute: ActivatedRoute, */
        private authenticationService: AuthenticationService, private projectService: ProjectService,
        private userService: UserService, private router: Router, private formBuilder: FormBuilder,
        private zone: NgZone
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
                this.modifyUserForm.get('file').setValue(event.target.files[0]);
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

        uploadData.append('modifyDate', JSON.stringify(this.modifyUser));
        if (this.modifyUserForm.get('file') != null) {
            uploadData.append('file', this.modifyUserForm.get('file').value);
        }

        /*  this.projectService.register(this.currentUser.token, uploadData)
             .subscribe(
                 resul => {
                     this.dateModifiedSuccessfull = true;
                     console.log(resul);
                 },
                 error => {
                     console.log(error);
                 }
             );
         this.modifyUser = new User();
         this.modifyUserForm.reset(); */
    }
}