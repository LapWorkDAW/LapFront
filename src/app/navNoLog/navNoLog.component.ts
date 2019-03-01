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
    constructor(private socialAuthService: AuthService, public router: Router, private authenticationService: AuthenticationService) {
        this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    }


    public signOut() {
        //verificar si password es de un sitio
        //haces una cosa
        //sino llamas a logout
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (this.currentUser.pass === null || this.currentUser.pass === "") {
            this.socialAuthService.signOut();
            this.router.navigate(['/']);
            /* localStorage.setItem('token', "null"); */
        } else {
            this.authenticationService.logout();
            this.router.navigate(['']);
        }


    }

    ngOnInit() {
        /* this.token = localStorage.getItem('token');
        if (this.token != "null") {
            this.isSignIn=true;
            console.log(this.isSignIn);
        } */
    }


}