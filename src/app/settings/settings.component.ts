import { Component, OnInit } from "@angular/core";
import { User } from "src/assets/models/User";
import { Router } from "@angular/router";
import { AuthenticationService } from "../services/authentication.service";
import { UserService } from "../services/user.service";
import { ProjectService } from "../services/project.service";
import { Subscription } from "rxjs";

@Component({
    selector: 'settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
    ngOnInit(): void {
        window.setInterval(() => { this.googleOK = true; }, 100);
    }
    currentUser: User;
    currentUserSubscription: Subscription;
    googleOK: boolean = false;
    constructor(
        /* private _activRoute: ActivatedRoute, */
        private authenticationService: AuthenticationService, private projectService: ProjectService,
        private userService: UserService, private router: Router
    ) {
        this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
            this.currentUser = user;
        });
        if (this.currentUser == null) {
            this.router.navigate(['']);
        }
    }
}