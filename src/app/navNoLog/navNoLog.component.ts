import { Component } from '@angular/core';
import { AuthService } from 'angular-6-social-login';
import { Router } from '@angular/router';
import { User } from 'src/assets/models/User';
import { AuthenticationService } from '../services/authentication.service';

@Component({
    selector: 'navNoLog',
    templateUrl: './navNoLog.component.html',
    styleUrls: ['../home/home.component.css', './navNoLog.component.css']
})

export class NavNoLogComponent {
    isSignIn: boolean = false;
    currentUser: User;
    token: String;
    photo: boolean = true;

    constructor(private socialAuthService: AuthService, public router: Router, private authenticationService: AuthenticationService) {
        this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    }

    ngOnInit() { }

    public signOut() {
        /* If the user's password is empty then he is a Google user */
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (this.currentUser.pass === null || this.currentUser.pass === "") {
            this.socialAuthService.signOut();
        }
        this.authenticationService.logout();
        this.router.navigate(['']);
    }

}